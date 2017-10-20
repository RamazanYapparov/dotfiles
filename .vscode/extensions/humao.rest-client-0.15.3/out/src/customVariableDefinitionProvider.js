'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const variableUtility_1 = require("./variableUtility");
const Constants = require("./constants");
class CustomVariableDefinitionProvider {
    provideDefinition(document, position, token) {
        if (!variableUtility_1.VariableUtility.isVariableReference(document, position)) {
            return Promise.resolve(null);
        }
        let documentLines = document.getText().split(/\r?\n/g);
        let wordRange = document.getWordRangeAtPosition(position);
        let selectedVariableName = document.getText(wordRange);
        let locations = this.getDefinitionRanges(documentLines, selectedVariableName);
        return Promise.resolve(locations.map(location => {
            return new vscode_1.Location(document.uri, location);
        }));
    }
    getDefinitionRanges(lines, variable) {
        let locations = [];
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];
            let match;
            if ((match = Constants.VariableDefinitionRegex.exec(line)) &&
                match[1] === variable) {
                let startPos = line.indexOf(`@${variable}`);
                let endPos = startPos + variable.length + 1;
                locations.push(new vscode_1.Range(index, startPos, index, endPos));
            }
        }
        ;
        return locations;
    }
}
exports.CustomVariableDefinitionProvider = CustomVariableDefinitionProvider;
//# sourceMappingURL=customVariableDefinitionProvider.js.map