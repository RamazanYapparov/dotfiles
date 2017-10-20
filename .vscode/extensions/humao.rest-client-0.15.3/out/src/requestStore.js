"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestStore {
    static add(requestId, request) {
        if (request && requestId) {
            RequestStore.cache.set(requestId, request);
            RequestStore.currentRequestId = requestId;
        }
    }
    static getLatest() {
        if (RequestStore.cache.has(RequestStore.currentRequestId)) {
            return RequestStore.cache.get(RequestStore.currentRequestId);
        }
        else {
            return null;
        }
    }
    static cancel(requestId = null) {
        requestId = requestId || RequestStore.currentRequestId;
        if (!RequestStore.cancelledRequestIds.has(requestId)) {
            RequestStore.cancelledRequestIds.add(requestId);
        }
    }
    static isCancelled(requestId) {
        return requestId && RequestStore.cancelledRequestIds.has(requestId);
    }
    static complete(requestId) {
        if (requestId) {
            RequestStore.completedRequestIds.add(requestId);
        }
    }
    static isCompleted(requestId = null) {
        requestId = requestId || RequestStore.currentRequestId;
        return RequestStore.completedRequestIds.has(requestId);
    }
}
RequestStore.cache = new Map();
RequestStore.cancelledRequestIds = new Set();
RequestStore.completedRequestIds = new Set();
exports.RequestStore = RequestStore;
//# sourceMappingURL=requestStore.js.map