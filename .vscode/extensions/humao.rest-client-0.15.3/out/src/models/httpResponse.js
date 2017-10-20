"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(statusCode, statusMessage, httpVersion, headers, body, elapsedMillionSeconds, requestUrl, bodySizeInBytes, headersSizeInBytes, bodyStream, timingPhases, request) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.httpVersion = httpVersion;
        this.headers = headers;
        this.body = body;
        this.elapsedMillionSeconds = elapsedMillionSeconds;
        this.requestUrl = requestUrl;
        this.bodySizeInBytes = bodySizeInBytes;
        this.headersSizeInBytes = headersSizeInBytes;
        this.bodyStream = bodyStream;
        this.timingPhases = timingPhases;
        this.request = request;
    }
    getResponseHeaderValue(name) {
        if (this.headers) {
            for (let header in this.headers) {
                if (header.toLowerCase() === name.toLowerCase()) {
                    return this.headers[header];
                }
            }
        }
        return null;
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=httpResponse.js.map