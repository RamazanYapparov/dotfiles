"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseStore {
    static get size() {
        return ResponseStore.cache.size;
    }
    static add(uri, response) {
        ResponseStore.cache.set(uri, response);
        ResponseStore.lastResponseUri = uri;
    }
    static get(uri) {
        return ResponseStore.cache.get(uri);
    }
    static remove(uri) {
        if (ResponseStore.cache.has(uri)) {
            ResponseStore.cache.delete(uri);
        }
    }
    static getLatestResponse() {
        return ResponseStore.lastResponseUri !== null
            ? ResponseStore.get(ResponseStore.lastResponseUri)
            : null;
    }
}
ResponseStore.cache = new Map();
ResponseStore.lastResponseUri = null;
exports.ResponseStore = ResponseStore;
//# sourceMappingURL=responseStore.js.map