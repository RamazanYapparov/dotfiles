"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime_1 = require("./models/mime");
class MimeUtility {
    static parse(contentTypeString) {
        // application/json; charset=utf-8
        // application/vnd.github.chitauri-preview+sha
        let params = contentTypeString.split(';');
        let types = params[0].trim().split('+');
        let charset = null;
        if (params.length > 1) {
            for (let i = 1; i < params.length; i++) {
                let attributes = params[i].trim().split('=', 2);
                if (attributes.length === 2 && attributes[0].toLowerCase() === 'charset') {
                    charset = attributes[1].trim();
                }
            }
        }
        return new mime_1.MIME(types[0], types[1] ? `+${types[1]}` : '', contentTypeString, charset);
    }
    static isBrowserSupportedImageFormat(contentTypeString) {
        // https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support
        // For chrome supports JPEG, GIF, WebP, PNG and BMP
        if (!contentTypeString) {
            return false;
        }
        let type = MimeUtility.parse(contentTypeString).type;
        return type === 'image/jpeg' || type === 'image/gif' || type === 'image/webp' || type === 'image/png' || type === 'image/bmp';
    }
    static isMultiPartFormData(contentTypeString) {
        if (!contentTypeString) {
            return false;
        }
        let type = MimeUtility.parse(contentTypeString).type;
        return type.toLowerCase() === 'multipart/form-data';
    }
    static isFormUrlEncoded(contentTypeString) {
        if (!contentTypeString) {
            return false;
        }
        let type = MimeUtility.parse(contentTypeString).type;
        return type.toLowerCase() === 'application/x-www-form-urlencoded';
    }
}
exports.MimeUtility = MimeUtility;
//# sourceMappingURL=mimeUtility.js.map