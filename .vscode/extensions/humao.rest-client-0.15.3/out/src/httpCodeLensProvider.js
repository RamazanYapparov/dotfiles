'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const selector_1 = require("./selector");
const Constants = require("./constants");
class HttpCodeLensProvider {
    provideCodeLenses(document, token) {
        let blocks = [];
        let lines = document.getText().split(/\r?\n/g);
        let delimitedLines = selector_1.Selector.getDelimiterRows(lines);
        delimitedLines.push(lines.length);
        let requestRange = [];
        let start = 0;
        for (let index = 0; index < delimitedLines.length; index++) {
            let end = delimitedLines[index] - 1;
            if (start <= end) {
                requestRange.push([start, end]);
                start = delimitedLines[index] + 1;
            }
        }
        for (let index = 0; index < requestRange.length; index++) {
            let blockStart = requestRange[index][0];
            let blockEnd = requestRange[index][1];
            // get real start for current requestRange
            while (blockStart <= blockEnd) {
                if (this.isEmptyLine(lines[blockStart]) ||
                    this.isCommentLine(lines[blockStart]) ||
                    this.isVariableDefinitionLine(lines[blockStart])) {
                    blockStart++;
                }
                else {
                    break;
                }
            }
            if (this.isResponseStatusLine(lines[blockStart])) {
                continue;
            }
            if (blockStart <= blockEnd) {
                const range = new vscode_1.Range(blockStart, 0, blockEnd, 0);
                const cmd = {
                    arguments: [document, range],
                    title: 'Send Request',
                    command: 'rest-client.request'
                };
                blocks.push(new vscode_1.CodeLens(range, cmd));
            }
        }
        return Promise.resolve(blocks);
    }
    isCommentLine(line) {
        return Constants.CommentIdentifiersRegex.test(line);
    }
    isEmptyLine(line) {
        return line.trim() === '';
    }
    isVariableDefinitionLine(line) {
        return Constants.VariableDefinitionRegex.test(line);
    }
    isResponseStatusLine(line) {
        return HttpCodeLensProvider.responseStatusLineRegex.test(line);
    }
}
HttpCodeLensProvider.responseStatusLineRegex = /^\s*HTTP\/[\d.]+/;
exports.HttpCodeLensProvider = HttpCodeLensProvider;
//# sourceMappingURL=httpCodeLensProvider.js.map