'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const variableUtility_1 = require("./variableUtility");
const Constants = require("./constants");
class CustomVariableReferenceProvider {
    provideReferences(document, position, context, token) {
        if (!variableUtility_1.VariableUtility.isVariableDefinition(document, position) && !variableUtility_1.VariableUtility.isVariableReference(document, position)) {
            return Promise.resolve([]);
        }
        let documentLines = document.getText().split(/\r?\n/g);
        let wordRange = document.getWordRangeAtPosition(position);
        let selectedVariableName = document.getText(wordRange);
        let locations = [];
        if (context.includeDeclaration) {
            let definitionLocations = this.getDefinitionRanges(documentLines, selectedVariableName);
            locations.push(...definitionLocations);
        }
        let referenceLocations = this.getReferenceRanges(documentLines, selectedVariableName);
        locations.push(...referenceLocations);
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
    getReferenceRanges(lines, variable) {
        let locations = [];
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];
            if (Constants.CommentIdentifiersRegex.test(line)) {
                continue;
            }
            let regex = new RegExp(`\{\{${variable}\}\}`, 'g');
            let match;
            while (match = regex.exec(line)) {
                let startPos = match.index + 2;
                let endPos = startPos + variable.length;
                locations.push(new vscode_1.Range(index, startPos, index, endPos));
                regex.lastIndex = match.index + 1;
            }
        }
        ;
        return locations;
    }
}
exports.CustomVariableReferenceProvider = CustomVariableReferenceProvider;
//# sourceMappingURL=customVariableReferenceProvider.js.map