'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const responseFormatUtility_1 = require("../responseFormatUtility");
const os_1 = require("os");
class UntitledFileContentProvider {
    static createHttpResponseUntitledFile(response, createNewFile, autoSetLanguage, additionalInfo, suppressValidation) {
        const language = autoSetLanguage ? UntitledFileContentProvider.languageFromContentType(response) : 'http';
        const content = UntitledFileContentProvider.formatResponse(response, language, additionalInfo, autoSetLanguage, suppressValidation);
        vscode_1.workspace.openTextDocument({ 'language': language, 'content': content }).then(document => {
            vscode_1.window.showTextDocument(document, { viewColumn: vscode_1.ViewColumn.Two, preserveFocus: false, preview: !createNewFile });
        });
    }
    static languageFromContentType(response) {
        let contentType = response.getResponseHeaderValue("Content-Type");
        if (!contentType) {
            return 'http';
        }
        ;
        let types = ['xml', 'json', 'html', 'css'];
        for (let type of types) {
            if (contentType.includes(type)) {
                return type;
            }
        }
        ;
        return 'http';
    }
    static formatResponse(response, language, additionalInfo, autoSetLanguage, suppressValidation) {
        const { responseStatusLine, headers, body } = UntitledFileContentProvider.extractStandardResponseInformation(response, suppressValidation);
        let responseInformation;
        if (additionalInfo) {
            const formattedAdditionalInfo = UntitledFileContentProvider.formatAdditionalResponseInformation(response);
            responseInformation = `${responseStatusLine}${formattedAdditionalInfo}${headers}`;
        }
        else {
            responseInformation = `${responseStatusLine}${headers}`;
        }
        return autoSetLanguage ? UntitledFileContentProvider.formatResponseForLanguage(responseInformation, body, language) :
            UntitledFileContentProvider.formatResponseDefault(responseInformation, body);
    }
    static formatResponseDefault(responseInformation, responseBody) {
        return `${responseInformation}${os_1.EOL}${responseBody}`;
    }
    static formatResponseForLanguage(responseInformation, responseBody, language) {
        let commentBegin = UntitledFileContentProvider.commentBegin(language);
        let commentEnd = UntitledFileContentProvider.commentEnd(language);
        return `${commentBegin}${os_1.EOL}${responseInformation}${commentEnd}${os_1.EOL}${responseBody}`;
    }
    static formatAdditionalResponseInformation(response) {
        let requestURL = `Request: ${response.requestUrl}${os_1.EOL}`;
        let elapsedTime = `Elapsed time: ${response.elapsedMillionSeconds}ms${os_1.EOL}`;
        return `${requestURL}${elapsedTime}`;
    }
    static extractStandardResponseInformation(response, suppressValidation) {
        let responseStatusLine = `HTTP/${response.httpVersion} ${response.statusCode} ${response.statusMessage}${os_1.EOL}`;
        let headers = '';
        for (let header in response.headers) {
            if (response.headers.hasOwnProperty(header)) {
                let value = response.headers[header];
                if (typeof response.headers[header] !== 'string') {
                    value = response.headers[header];
                }
                headers += `${header}: ${value}${os_1.EOL}`;
            }
        }
        let body = responseFormatUtility_1.ResponseFormatUtility.FormatBody(response.body, response.getResponseHeaderValue("content-type"), suppressValidation);
        return { responseStatusLine, headers, body };
    }
    static commentBegin(language) {
        const REST_RESPONSE = 'REST Response Information:';
        let commentStyle = {
            xml: '<!-- ',
            json: '/* ',
            html: '<!-- ',
            css: '/* '
        };
        return commentStyle[language] ? commentStyle[language] + REST_RESPONSE : '';
    }
    static commentEnd(language) {
        let commentStyle = {
            xml: '-->',
            json: '*/',
            html: '-->',
            css: '*/'
        };
        return commentStyle[language] ? commentStyle[language] : '';
    }
}
exports.UntitledFileContentProvider = UntitledFileContentProvider;
//# sourceMappingURL=responseUntitledFileContentProvider.js.map