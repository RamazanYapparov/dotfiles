'use strict';
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
const httpElementFactory_1 = require("./httpElementFactory");
const httpElement_1 = require("./models/httpElement");
class HttpCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let completionItems = [];
            let elements = yield httpElementFactory_1.HttpElementFactory.getHttpElements(document.lineAt(position).text);
            elements.map(e => {
                let item = new vscode_1.CompletionItem(e.name);
                item.detail = `HTTP ${httpElement_1.ElementType[e.type]}`;
                item.documentation = e.description;
                item.insertText = e.text;
                item.kind = e.type === httpElement_1.ElementType.SystemVariable
                    ? vscode_1.CompletionItemKind.Variable
                    : e.type === httpElement_1.ElementType.Method
                        ? vscode_1.CompletionItemKind.Method
                        : e.type === httpElement_1.ElementType.Header
                            ? vscode_1.CompletionItemKind.Property
                            : vscode_1.CompletionItemKind.Field;
                completionItems.push(item);
            });
            return completionItems;
        });
    }
}
exports.HttpCompletionItemProvider = HttpCompletionItemProvider;
//# sourceMappingURL=httpCompletionItemProvider.js.map