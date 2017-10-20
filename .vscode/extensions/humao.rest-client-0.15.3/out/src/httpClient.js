"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const httpRequest_1 = require("./models/httpRequest");
const httpResponse_1 = require("./models/httpResponse");
const httpResponseTimingPhases_1 = require("./models/httpResponseTimingPhases");
const hostCertificate_1 = require("./models/hostCertificate");
const persistUtility_1 = require("./persistUtility");
const mimeUtility_1 = require("./mimeUtility");
const url = require("url");
const fs = require("fs");
const path = require("path");
const encodeUrl = require('encodeurl');
const request = require('request');
const cookieStore = require('tough-cookie-file-store-bugfix');
const iconv = require('iconv-lite');
class HttpClient {
    constructor(settings) {
        this._settings = settings;
        persistUtility_1.PersistUtility.createFileIfNotExists(persistUtility_1.PersistUtility.cookieFilePath);
    }
    send(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                url: encodeUrl(httpRequest.url),
                headers: httpRequest.headers,
                method: httpRequest.method,
                body: httpRequest.body,
                encoding: null,
                time: true,
                timeout: this._settings.timeoutInMilliseconds,
                gzip: true,
                followRedirect: this._settings.followRedirect,
                jar: this._settings.rememberCookiesForSubsequentRequests ? request.jar(new cookieStore(persistUtility_1.PersistUtility.cookieFilePath)) : false,
                forever: true
            };
            // set auth to digest if Authorization header follows: Authorization: Digest username password
            let authorization = HttpClient.getHeaderValue(options.headers, 'Authorization');
            if (authorization) {
                let start = authorization.indexOf(' ');
                let scheme = authorization.substr(0, start);
                if (scheme === 'Digest' || scheme === 'Basic') {
                    let params = authorization.substr(start).trim().split(' ');
                    if (params.length === 2) {
                        options.auth = {
                            user: params[0],
                            pass: params[1],
                            sendImmediately: scheme === 'Basic'
                        };
                    }
                }
            }
            // set certificate
            let certificate = this.getRequestCertificate(httpRequest.url);
            options.cert = certificate.cert;
            options.key = certificate.key;
            options.pfx = certificate.pfx;
            options.passphrase = certificate.passphrase;
            // set proxy
            options.proxy = HttpClient.ignoreProxy(httpRequest.url, this._settings.excludeHostsForProxy) ? null : this._settings.proxy;
            options.strictSSL = options.proxy && options.proxy.length > 0 ? this._settings.proxyStrictSSL : false;
            if (!options.headers) {
                options.headers = httpRequest.headers = {};
            }
            // add default user agent if not specified
            if (!HttpClient.getHeaderValue(options.headers, 'User-Agent')) {
                options.headers['User-Agent'] = this._settings.defaultUserAgent;
            }
            let size = 0;
            let headersSize = 0;
            return new Promise((resolve, reject) => {
                request(options, function (error, response, body) {
                    if (error) {
                        if (error.message) {
                            if (error.message.startsWith("Header name must be a valid HTTP Token")) {
                                error.message = "Header must be in 'header name: header value' format, "
                                    + "please also make sure there is a blank line between headers and body";
                            }
                        }
                        reject(error);
                        return;
                    }
                    let contentType = HttpClient.getHeaderValue(response.headers, 'Content-Type');
                    let encoding;
                    if (contentType) {
                        encoding = mimeUtility_1.MimeUtility.parse(contentType).charset;
                    }
                    if (!encoding) {
                        encoding = "utf8";
                    }
                    let bodyStream = body;
                    let buffer = new Buffer(body);
                    try {
                        body = iconv.decode(buffer, encoding);
                    }
                    catch (e) {
                        if (encoding !== 'utf8') {
                            body = iconv.decode(buffer, 'utf8');
                        }
                    }
                    // adjust response header case, due to the response headers in request package is in lowercase
                    let headersDic = HttpClient.getResponseRawHeaderNames(response.rawHeaders);
                    let adjustedResponseHeaders = {};
                    for (let header in response.headers) {
                        let adjustedHeaderName = header;
                        if (headersDic[header]) {
                            adjustedHeaderName = headersDic[header];
                            adjustedResponseHeaders[headersDic[header]] = response.headers[header];
                        }
                        adjustedResponseHeaders[adjustedHeaderName] = response.headers[header];
                    }
                    resolve(new httpResponse_1.HttpResponse(response.statusCode, response.statusMessage, response.httpVersion, adjustedResponseHeaders, body, response.elapsedTime, httpRequest.url, size, headersSize, bodyStream, new httpResponseTimingPhases_1.HttpResponseTimingPhases(response.timingPhases.total, response.timingPhases.wait, response.timingPhases.dns, response.timingPhases.tcp, response.timingPhases.firstByte, response.timingPhases.download), new httpRequest_1.HttpRequest(options.method, options.url, HttpClient.capitalizeHeaderName(response.toJSON().request.headers), httpRequest.body, httpRequest.rawBody)));
                })
                    .on('data', function (data) {
                    size += data.length;
                })
                    .on('response', function (response) {
                    if (response.rawHeaders) {
                        headersSize += response.rawHeaders.map(h => h.length).reduce((a, b) => a + b, 0);
                        headersSize += (response.rawHeaders.length) / 2;
                    }
                });
            });
        });
    }
    static getHeaderValue(headers, headerName) {
        if (headers) {
            for (let key in headers) {
                if (key.toLowerCase() === headerName.toLowerCase()) {
                    return headers[key];
                }
            }
        }
        return null;
    }
    getRequestCertificate(requestUrl) {
        let resolvedUrl = url.parse(requestUrl);
        let hostName = resolvedUrl.hostname;
        let port = resolvedUrl.port;
        let host = port ? `${hostName}:${port}` : hostName;
        if (host in this._settings.hostCertificates) {
            let certificate = this._settings.hostCertificates[host];
            let cert = undefined, key = undefined, pfx = undefined;
            if (certificate.cert) {
                let certPath = HttpClient.resolveCertificateFullPath(certificate.cert, "cert");
                if (certPath) {
                    cert = fs.readFileSync(certPath);
                }
            }
            if (certificate.key) {
                let keyPath = HttpClient.resolveCertificateFullPath(certificate.key, "key");
                if (keyPath) {
                    key = fs.readFileSync(keyPath);
                }
            }
            if (certificate.pfx) {
                let pfxPath = HttpClient.resolveCertificateFullPath(certificate.pfx, "pfx");
                if (pfxPath) {
                    pfx = fs.readFileSync(pfxPath);
                }
            }
            return new hostCertificate_1.HostCertificate(cert, key, pfx, certificate.passphrase);
        }
        else {
            return new hostCertificate_1.HostCertificate();
        }
    }
    static getResponseRawHeaderNames(rawHeaders) {
        let result = {};
        rawHeaders.forEach(header => {
            result[header.toLowerCase()] = header;
        });
        return result;
    }
    static ignoreProxy(requestUrl, excludeHostsForProxy) {
        if (!excludeHostsForProxy || excludeHostsForProxy.length === 0) {
            return false;
        }
        let resolvedUrl = url.parse(requestUrl);
        let hostName = resolvedUrl.hostname.toLowerCase();
        let port = resolvedUrl.port;
        let excludeHostsProxyList = Array.from(new Set(excludeHostsForProxy.map(eh => eh.toLowerCase())));
        for (let index = 0; index < excludeHostsProxyList.length; index++) {
            let eh = excludeHostsProxyList[index];
            let urlParts = eh.split(":");
            if (!port) {
                // if no port specified in request url, host name must exactly match
                if (urlParts.length === 1 && urlParts[0] === hostName) {
                    return true;
                }
                ;
            }
            else {
                // if port specified, match host without port or hostname:port exactly match
                if (urlParts.length === 1 && urlParts[0] === hostName) {
                    return true;
                }
                else if (urlParts.length === 2 && urlParts[0] === hostName && urlParts[1] === port) {
                    return true;
                }
            }
        }
        return false;
    }
    static resolveCertificateFullPath(absoluteOrRelativePath, certName) {
        if (path.isAbsolute(absoluteOrRelativePath)) {
            if (!fs.existsSync(absoluteOrRelativePath)) {
                vscode_1.window.showWarningMessage(`Certificate path ${absoluteOrRelativePath} of ${certName} doesn't exist, please make sure it exists.`);
                return;
            }
            else {
                return absoluteOrRelativePath;
            }
        }
        // the path should be relative path
        let rootPath = vscode_1.workspace.rootPath;
        let absolutePath = '';
        if (rootPath) {
            absolutePath = path.join(rootPath, absoluteOrRelativePath);
            if (fs.existsSync(absolutePath)) {
                return absolutePath;
            }
            else {
                vscode_1.window.showWarningMessage(`Certificate path ${absoluteOrRelativePath} of ${certName} doesn't exist, please make sure it exists.`);
                return;
            }
        }
        absolutePath = path.join(path.dirname(vscode_1.window.activeTextEditor.document.fileName), absoluteOrRelativePath);
        if (fs.existsSync(absolutePath)) {
            return absolutePath;
        }
        else {
            vscode_1.window.showWarningMessage(`Certificate path ${absoluteOrRelativePath} of ${certName} doesn't exist, please make sure it exists.`);
            return;
        }
    }
    static capitalizeHeaderName(headers) {
        let normalizedHeaders = {};
        if (headers) {
            for (let header in headers) {
                let capitalizedName = header.replace(/([^-]+)/g, h => h.charAt(0).toUpperCase() + h.slice(1));
                normalizedHeaders[capitalizedName] = headers[header];
            }
        }
        return normalizedHeaders;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=httpClient.js.map