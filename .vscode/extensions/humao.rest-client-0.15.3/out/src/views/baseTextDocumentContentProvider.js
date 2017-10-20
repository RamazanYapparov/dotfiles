"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class BaseTextDocumentContentProvider {
    constructor() {
        this._onDidChange = new vscode_1.EventEmitter();
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    update(uri) {
        this._onDidChange.fire(uri);
    }
}
exports.BaseTextDocumentContentProvider = BaseTextDocumentContentProvider;
//# sourceMappingURL=baseTextDocumentContentProvider.js.map