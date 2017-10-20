'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RequestParserUtil {
    static parseRequestHeaders(headerLines) {
        // message-header = field-name ":" [ field-value ]
        let headers = {};
        let headerNames = {};
        headerLines.forEach(headerLine => {
            let fieldName;
            let fieldValue;
            let separatorIndex = headerLine.indexOf(':');
            if (separatorIndex === -1) {
                fieldName = headerLine;
                fieldValue = '';
            }
            else {
                fieldName = headerLine.substring(0, separatorIndex);
                fieldValue = headerLine.substring(separatorIndex + 1);
            }
            let normalizedFieldName = fieldName.trim().toLowerCase();
            let normalizedFieldValue = fieldValue.trim();
            if (!headerNames[normalizedFieldName]) {
                headerNames[normalizedFieldName] = fieldName;
                headers[fieldName] = normalizedFieldValue;
            }
            else {
                let splitter = normalizedFieldName === 'cookie' ? ';' : ',';
                headers[headerNames[normalizedFieldName]] += `${splitter}${normalizedFieldValue}`;
            }
        });
        return headers;
    }
}
exports.RequestParserUtil = RequestParserUtil;
//# sourceMappingURL=requestParserUtil.js.map