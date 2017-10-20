"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HARHeader {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.HARHeader = HARHeader;
class HARCookie {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.HARCookie = HARCookie;
class HARParam {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.HARParam = HARParam;
class HARPostData {
    constructor(mimeType, text) {
        this.mimeType = mimeType;
        this.text = text;
        if (mimeType === 'application/x-www-form-urlencoded') {
            if (text) {
                text = decodeURIComponent(text.replace('+', '%20'));
                this.params = [];
                let pairs = text.split('&');
                pairs.forEach(pair => {
                    let key, value;
                    [key, value] = pair.split('=');
                    this.params.push(new HARParam(key, value));
                });
            }
        }
    }
}
exports.HARPostData = HARPostData;
class HARHttpRequest {
    constructor(method, url, headers, cookies, postData) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.cookies = cookies;
        this.postData = postData;
    }
}
exports.HARHttpRequest = HARHttpRequest;
//# sourceMappingURL=harHttpRequest.js.map