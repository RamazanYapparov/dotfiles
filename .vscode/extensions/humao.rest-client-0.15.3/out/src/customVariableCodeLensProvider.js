'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const Constants = require("./constants");
class CustomVariableCodeLensProvider {
    provideCodeLenses(document, token) {
        let documentLines = document.getText().split(/\r?\n/g);
        let locations = [];
        for (var index = 0; index < documentLines.length; index++) {
            var line = documentLines[index];
            let match;
            if ((match = Constants.VariableDefinitionRegex.exec(line)) &&
                typeof match !== null &&
                match[1] === variable) {
                let startPos = line.indexOf(`@${variable}`);
                let endPos = startPos + variable.length + 1;
                locations.push(new vscode_1.Range(index, startPos, index, endPos));
            }
        }
        ;
        throw "Not Implemented";
    }
}
exports.CustomVariableCodeLensProvider = CustomVariableCodeLensProvider;
//# sourceMappingURL=customVariableCodeLensProvider.js.map