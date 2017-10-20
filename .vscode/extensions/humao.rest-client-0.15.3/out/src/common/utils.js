'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isJson(data) {
    try {
        JSON.parse(data);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isJson = isJson;
//# sourceMappingURL=utils.js.map