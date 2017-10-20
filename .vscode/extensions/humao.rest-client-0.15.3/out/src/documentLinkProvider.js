'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require("path");
const fs = require("fs");
class RequestBodyDocumentLinkProvider {
    constructor() {
        this._linkPattern = /^(\<\s+)(\S+)(\s*)$/g;
    }
    provideDocumentLinks(document, _token) {
        const results = [];
        const base = path.dirname(document.uri.fsPath);
        const text = document.getText();
        let lines = text.split(/\r?\n/g);
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];
            let match;
            if (match = this._linkPattern.exec(line)) {
                let filePath = match[2];
                const offset = match[1].length;
                const linkStart = new vscode_1.Position(index, offset);
                const linkEnd = new vscode_1.Position(index, offset + filePath.length);
                results.push(new vscode_1.DocumentLink(new vscode_1.Range(linkStart, linkEnd), this.normalizeLink(document, filePath, base)));
            }
        }
        return results;
    }
    normalizeLink(document, link, base) {
        let resourcePath;
        if (path.isAbsolute(link)) {
            resourcePath = link;
        }
        else {
            if (vscode_1.workspace.rootPath) {
                resourcePath = path.join(vscode_1.workspace.rootPath, link);
                if (!fs.existsSync(resourcePath)) {
                    resourcePath = path.join(base, link);
                }
            }
            else {
                resourcePath = path.join(base, link);
            }
        }
        return vscode_1.Uri.parse(`command:rest-client._openDocumentLink?${encodeURIComponent(JSON.stringify({ path: resourcePath }))}`);
    }
}
exports.RequestBodyDocumentLinkProvider = RequestBodyDocumentLinkProvider;
//# sourceMappingURL=documentLinkProvider.js.map