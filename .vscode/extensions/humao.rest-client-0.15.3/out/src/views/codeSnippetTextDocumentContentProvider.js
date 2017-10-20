"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const baseTextDocumentContentProvider_1 = require("./baseTextDocumentContentProvider");
const Constants = require("../constants");
const path = require("path");
const hljs = require('highlight.js');
const codeHighlightLinenums = require('code-highlight-linenums');
class CodeSnippetTextDocumentContentProvider extends baseTextDocumentContentProvider_1.BaseTextDocumentContentProvider {
    constructor(convertResult, lang) {
        super();
        this.convertResult = convertResult;
        this.lang = lang;
    }
    provideTextDocumentContent(uri) {
        if (this.convertResult) {
            return `
            <head>
                <link rel="stylesheet" href="${CodeSnippetTextDocumentContentProvider.cssFilePath}">
            </head>
            <body>
                <div>
                    <pre><code>${codeHighlightLinenums(this.convertResult, { hljs: hljs, lang: this.getHighlightJsLanguageAlias(), start: 1 })}</code></pre>
                    <a id="scroll-to-top" role="button" aria-label="scroll to top" onclick="scroll(0,0)"><span class="icon"></span></a>
                </div>
            </body>`;
        }
    }
    getHighlightJsLanguageAlias() {
        if (!this.lang || this.lang === 'shell') {
            return 'bash';
        }
        if (this.lang === 'node') {
            return 'javascript';
        }
        return this.lang;
    }
}
CodeSnippetTextDocumentContentProvider.cssFilePath = path.join(vscode_1.extensions.getExtension(Constants.ExtensionId).extensionPath, Constants.CSSFolderName, Constants.CSSFileName);
exports.CodeSnippetTextDocumentContentProvider = CodeSnippetTextDocumentContentProvider;
//# sourceMappingURL=codeSnippetTextDocumentContentProvider.js.map