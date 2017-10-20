"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const arrayUtility_1 = require("./common/arrayUtility");
const httpRequest_1 = require("./models/httpRequest");
const requestParserUtil_1 = require("./requestParserUtil");
const httpClient_1 = require("./httpClient");
const mimeUtility_1 = require("./mimeUtility");
const os_1 = require("os");
const fs = require("fs");
const path = require("path");
const CombinedStream = require('combined-stream');
const encodeurl = require('encodeurl');
class HttpRequestParser {
    parseHttpRequest(requestRawText, requestAbsoluteFilePath, parseFileContentAsStream) {
        // parse follows http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html
        // split the request raw text into lines
        let lines = requestRawText.split(os_1.EOL);
        // skip leading empty lines
        lines = arrayUtility_1.ArrayUtility.skipWhile(lines, value => value.trim() === '');
        // skip trailing empty lines
        lines = arrayUtility_1.ArrayUtility.skipWhile(lines.reverse(), value => value.trim() === '').reverse();
        if (lines.length === 0) {
            return null;
        }
        // parse request line
        let requestLine = HttpRequestParser.parseRequestLine(lines[0]);
        // get headers range
        let headers;
        let body;
        let bodyLines = [];
        let headerStartLine = arrayUtility_1.ArrayUtility.firstIndexOf(lines, value => value.trim() !== '', 1);
        if (headerStartLine !== -1) {
            if (headerStartLine === 1) {
                // parse request headers
                let firstEmptyLine = arrayUtility_1.ArrayUtility.firstIndexOf(lines, value => value.trim() === '', headerStartLine);
                let headerEndLine = firstEmptyLine === -1 ? lines.length : firstEmptyLine;
                let headerLines = lines.slice(headerStartLine, headerEndLine);
                let index = 0;
                let queryString = '';
                for (; index < headerLines.length;) {
                    let headerLine = (headerLines[index]).trim();
                    if (headerLine[0] in { '?': '', '&': '' } && headerLine.split('=').length === 2) {
                        queryString += headerLine;
                        index++;
                        continue;
                    }
                    break;
                }
                if (queryString !== '') {
                    requestLine.url += queryString;
                }
                headers = requestParserUtil_1.RequestParserUtil.parseRequestHeaders(headerLines.slice(index));
                // get body range
                let bodyStartLine = arrayUtility_1.ArrayUtility.firstIndexOf(lines, value => value.trim() !== '', headerEndLine);
                if (bodyStartLine !== -1) {
                    let contentTypeHeader = HttpRequestParser.getContentTypeHeader(headers);
                    firstEmptyLine = arrayUtility_1.ArrayUtility.firstIndexOf(lines, value => value.trim() === '', bodyStartLine);
                    let bodyEndLine = mimeUtility_1.MimeUtility.isMultiPartFormData(contentTypeHeader) || firstEmptyLine === -1 ? lines.length : firstEmptyLine;
                    bodyLines = lines.slice(bodyStartLine, bodyEndLine);
                }
            }
            else {
                // parse body, since no headers provided
                let firstEmptyLine = arrayUtility_1.ArrayUtility.firstIndexOf(lines, value => value.trim() === '', headerStartLine);
                let bodyEndLine = firstEmptyLine === -1 ? lines.length : firstEmptyLine;
                bodyLines = lines.slice(headerStartLine, bodyEndLine);
            }
        }
        // if Host header provided and url is relative path, change to absolute url
        if (httpClient_1.HttpClient.getHeaderValue(headers, 'Host') && requestLine.url[0] === '/') {
            requestLine.url = `http://${httpClient_1.HttpClient.getHeaderValue(headers, 'Host')}${requestLine.url}`;
        }
        // parse body
        let contentTypeHeader = HttpRequestParser.getContentTypeHeader(headers);
        body = HttpRequestParser.parseRequestBody(bodyLines, requestAbsoluteFilePath, contentTypeHeader, parseFileContentAsStream);
        if (body && typeof body === 'string' && mimeUtility_1.MimeUtility.isFormUrlEncoded(HttpRequestParser.getContentTypeHeader(headers))) {
            body = encodeurl(body);
        }
        return new httpRequest_1.HttpRequest(requestLine.method, requestLine.url, headers, body, bodyLines.join(os_1.EOL));
    }
    static parseRequestLine(line) {
        // Request-Line = Method SP Request-URI SP HTTP-Version CRLF
        let words = line.split(' ').filter(Boolean);
        let method;
        let url;
        if (words.length === 1) {
            // Only provides request url
            method = HttpRequestParser.defaultMethod;
            url = words[0];
        }
        else {
            // Provides both request method and url
            method = words.shift();
            if (words[words.length - 1].match(/HTTP\/.*/gi)) {
                words.pop();
            }
            url = words.join(' ');
        }
        return {
            method: method,
            url: url
        };
    }
    static parseRequestBody(lines, requestFileAbsolutePath, contentTypeHeader, parseFileContentAsStream) {
        if (!lines || lines.length === 0) {
            return null;
        }
        // Check if needed to upload file
        if (lines.every(line => !HttpRequestParser.uploadFromFileSyntax.test(line))) {
            return lines.join(os_1.EOL);
        }
        else {
            if (parseFileContentAsStream) {
                let combinedStream = CombinedStream.create({ maxDataSize: 10 * 1024 * 1024 });
                lines.forEach(line => {
                    if (HttpRequestParser.uploadFromFileSyntax.test(line)) {
                        let groups = HttpRequestParser.uploadFromFileSyntax.exec(line);
                        if (groups !== null && groups.length === 2) {
                            let fileUploadPath = groups[1];
                            let fileAbsolutePath = HttpRequestParser.resolveFilePath(fileUploadPath, requestFileAbsolutePath);
                            if (fileAbsolutePath && fs.existsSync(fileAbsolutePath)) {
                                combinedStream.append(fs.createReadStream(fileAbsolutePath));
                            }
                            else {
                                combinedStream.append(line);
                            }
                        }
                    }
                    else {
                        combinedStream.append(line);
                    }
                    combinedStream.append(HttpRequestParser.getLineEnding(contentTypeHeader));
                });
                return combinedStream;
            }
            else {
                let contents = [];
                lines.forEach(line => {
                    if (HttpRequestParser.uploadFromFileSyntax.test(line)) {
                        let groups = HttpRequestParser.uploadFromFileSyntax.exec(line);
                        if (groups !== null && groups.length === 2) {
                            let fileUploadPath = groups[1];
                            let fileAbsolutePath = HttpRequestParser.resolveFilePath(fileUploadPath, requestFileAbsolutePath);
                            if (fileAbsolutePath && fs.existsSync(fileAbsolutePath)) {
                                contents.push(fs.readFileSync(fileAbsolutePath));
                            }
                            else {
                                contents.push(line);
                            }
                        }
                    }
                    else {
                        contents.push(line);
                    }
                });
                return contents.join(os_1.EOL);
            }
        }
    }
    static getLineEnding(contentTypeHeader) {
        return mimeUtility_1.MimeUtility.isMultiPartFormData(contentTypeHeader) ? '\r\n' : os_1.EOL;
    }
    static resolveFilePath(refPath, httpFilePath) {
        if (path.isAbsolute(refPath)) {
            return fs.existsSync(refPath) ? refPath : null;
        }
        let rootPath = vscode_1.workspace.rootPath;
        let absolutePath;
        if (rootPath) {
            absolutePath = path.join(rootPath, refPath);
            if (fs.existsSync(absolutePath)) {
                return absolutePath;
            }
        }
        absolutePath = path.join(path.dirname(httpFilePath), refPath);
        if (fs.existsSync(absolutePath)) {
            return absolutePath;
        }
        return null;
    }
    static getContentTypeHeader(headers) {
        if (headers) {
            for (let header in headers) {
                if (header.toLowerCase() === 'content-type') {
                    return headers[header];
                }
            }
        }
        return null;
    }
}
HttpRequestParser.defaultMethod = 'GET';
HttpRequestParser.uploadFromFileSyntax = new RegExp('^\<[ \t]+([^ \t]*)[ \t]*$');
exports.HttpRequestParser = HttpRequestParser;
//# sourceMappingURL=httpRequestParser.js.map