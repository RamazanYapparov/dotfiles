"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const httpRequest_1 = require("./models/httpRequest");
const requestParserUtil_1 = require("./requestParserUtil");
const fs = require("fs");
const path = require("path");
const yargs = require('yargs');
const DefaultContentType = 'application/x-www-form-urlencoded';
class CurlRequestParser {
    parseHttpRequest(requestRawText, requestAbsoluteFilePath, parseFileContentAsStream) {
        let requestText = CurlRequestParser.mergeMultipleSpacesIntoSingle(CurlRequestParser.mergeIntoSingleLine(requestRawText.trim()));
        requestText = requestText.replace(/(-X)(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|CONNECT|TRACE)/, '$1 $2');
        let yargObject = yargs(requestText);
        let parsedArguments = yargObject.argv;
        // parse url
        let url = parsedArguments._[1];
        if (!url) {
            url = parsedArguments.L || parsedArguments.location || parsedArguments.compressed || parsedArguments.url;
        }
        // parse header
        let headers = {};
        let parsedHeaders = parsedArguments.H || parsedArguments.header;
        if (parsedHeaders) {
            if (!Array.isArray(parsedHeaders)) {
                parsedHeaders = [parsedHeaders];
            }
            headers = requestParserUtil_1.RequestParserUtil.parseRequestHeaders(parsedHeaders);
        }
        //parse cookie
        let cookieString = parsedArguments.b || parsedArguments.cookie;
        if (cookieString && cookieString.includes('=')) {
            // Doesn't support cookie jar
            headers['Cookie'] = cookieString;
        }
        let user = parsedArguments.u || parsedArguments.user;
        if (user) {
            headers['Authorization'] = `Basic ${new Buffer(user).toString('base64')}`;
        }
        // parse body
        let body = parsedArguments.d || parsedArguments.data || parsedArguments['data-binary'];
        if (Array.isArray(body)) {
            body = body.join('&');
        }
        if (typeof body === 'string' && body[0] === '@') {
            let fileAbsolutePath = CurlRequestParser.resolveFilePath(body.substring(1), requestAbsoluteFilePath);
            if (fileAbsolutePath && fs.existsSync(fileAbsolutePath)) {
                if (parseFileContentAsStream) {
                    body = fs.createReadStream(fileAbsolutePath);
                }
                else {
                    body = fs.readFileSync(fileAbsolutePath).toString();
                }
            }
            else {
                body = body.substring(1);
            }
        }
        // Set Content-Type header to application/x-www-form-urlencoded if has body and missing this header
        if (body && !CurlRequestParser.hasContentTypeHeader(headers)) {
            headers['Content-Type'] = DefaultContentType;
        }
        // parse method
        let method = (parsedArguments.X || parsedArguments.request);
        if (!method) {
            method = body ? "POST" : "GET";
        }
        return new httpRequest_1.HttpRequest(method, url, headers, body, body);
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
    static mergeIntoSingleLine(text) {
        return text.replace(/\\\r|\\\n/g, '');
    }
    static mergeMultipleSpacesIntoSingle(text) {
        return text.replace(/\s{2,}/g, ' ');
    }
    static hasContentTypeHeader(headers) {
        for (let header in headers) {
            if (header.toLowerCase() === 'content-type') {
                return true;
            }
        }
        return false;
    }
}
exports.CurlRequestParser = CurlRequestParser;
//# sourceMappingURL=curlRequestParser.js.map