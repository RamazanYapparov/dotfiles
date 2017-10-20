"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curlRequestParser_1 = require("../curlRequestParser");
const httpRequestParser_1 = require("../httpRequestParser");
class RequestParserFactory {
    createRequestParser(rawHttpRequest) {
        if (rawHttpRequest.trim().toLowerCase().startsWith('curl'.toLowerCase())) {
            return new curlRequestParser_1.CurlRequestParser();
        }
        else {
            return new httpRequestParser_1.HttpRequestParser();
        }
    }
}
exports.RequestParserFactory = RequestParserFactory;
//# sourceMappingURL=requestParserFactory.js.map