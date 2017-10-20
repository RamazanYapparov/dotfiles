"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
class Selector {
    getSelectedText(editor, range = null) {
        if (!editor || !editor.document) {
            return null;
        }
        let selectedText;
        if (editor.selection.isEmpty) {
            let activeLine = !range ? editor.selection.active.line : range.start.line;
            selectedText = this.getDelimitedText(editor.document.getText(), activeLine);
        }
        else {
            selectedText = editor.document.getText(editor.selection);
        }
        return selectedText;
    }
    static getDelimiterRows(lines) {
        let rows = [];
        for (let index = 0; index < lines.length; index++) {
            if (lines[index].match(/^#{3,}/)) {
                rows.push(index);
            }
        }
        return rows;
    }
    getDelimitedText(fullText, currentLine) {
        let lines = fullText.split(/\r?\n/g);
        let delimiterLineNumbers = Selector.getDelimiterRows(lines);
        if (delimiterLineNumbers.length === 0) {
            return fullText;
        }
        // return null if cursor is in delimiter line
        if (delimiterLineNumbers.indexOf(currentLine) > -1) {
            return null;
        }
        if (currentLine < delimiterLineNumbers[0]) {
            return lines.slice(0, delimiterLineNumbers[0]).join(os_1.EOL);
        }
        if (currentLine > delimiterLineNumbers[delimiterLineNumbers.length - 1]) {
            return lines.slice(delimiterLineNumbers[delimiterLineNumbers.length - 1] + 1).join(os_1.EOL);
        }
        for (let index = 0; index < delimiterLineNumbers.length - 1; index++) {
            let start = delimiterLineNumbers[index];
            let end = delimiterLineNumbers[index + 1];
            if (start < currentLine && currentLine < end) {
                return lines.slice(start + 1, end).join(os_1.EOL);
            }
        }
    }
}
exports.Selector = Selector;
//# sourceMappingURL=selector.js.map