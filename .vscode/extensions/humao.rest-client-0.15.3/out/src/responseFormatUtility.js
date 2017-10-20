'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const mimeUtility_1 = require("./mimeUtility");
const pd = require('pretty-data').pd;
class ResponseFormatUtility {
    static FormatBody(body, contentType, suppressValidation) {
        if (contentType) {
            let mime = mimeUtility_1.MimeUtility.parse(contentType);
            let type = mime.type;
            let suffix = mime.suffix;
            if (type === 'application/json' ||
                suffix === '+json') {
                if (ResponseFormatUtility.IsJsonString(body)) {
                    body = JSON.stringify(JSON.parse(body), null, 2);
                }
                else if (!suppressValidation) {
                    vscode_1.window.showWarningMessage('The content type of response is application/json, while response body is not a valid json string');
                }
            }
            else if (type === 'application/xml' ||
                type === 'text/xml' ||
                (type === 'application/atom' && suffix === '+xml')) {
                body = pd.xml(body);
            }
            else if (type === 'text/css') {
                body = pd.css(body);
            }
        }
        return body;
    }
    static IsJsonString(data) {
        try {
            JSON.parse(data);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.ResponseFormatUtility = ResponseFormatUtility;
//# sourceMappingURL=responseFormatUtility.js.map