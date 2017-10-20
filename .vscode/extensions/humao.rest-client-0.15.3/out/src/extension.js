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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const requestController_1 = require("./controllers/requestController");
const historyController_1 = require("./controllers/historyController");
const responseController_1 = require("./controllers/responseController");
const codeSnippetController_1 = require("./controllers/codeSnippetController");
const environmentController_1 = require("./controllers/environmentController");
const httpCompletionItemProvider_1 = require("./httpCompletionItemProvider");
const customVariableHoverProvider_1 = require("./customVariableHoverProvider");
const customVariableDefinitionProvider_1 = require("./customVariableDefinitionProvider");
const customVariableReferenceProvider_1 = require("./customVariableReferenceProvider");
const httpCodeLensProvider_1 = require("./httpCodeLensProvider");
const documentLinkProvider_1 = require("./documentLinkProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log('Congratulations, your extension "rest-client" is now active!');
        let requestController = new requestController_1.RequestController();
        let historyController = new historyController_1.HistoryController();
        let responseController = new responseController_1.ResponseController();
        let codeSnippetController = new codeSnippetController_1.CodeSnippetController();
        let environmentController = new environmentController_1.EnvironmentController(yield environmentController_1.EnvironmentController.getCurrentEnvironment());
        context.subscriptions.push(requestController);
        context.subscriptions.push(historyController);
        context.subscriptions.push(codeSnippetController);
        context.subscriptions.push(environmentController);
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.request', ((document, range) => requestController.run(range))));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.rerun-last-request', () => requestController.rerun()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.cancel-request', () => requestController.cancel()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.history', () => historyController.save()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.clear-history', () => historyController.clear()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.save-response', uri => responseController.save(uri)));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.save-response-body', uri => responseController.saveBody(uri)));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.generate-codesnippet', () => codeSnippetController.run()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.copy-codesnippet', () => codeSnippetController.copy()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.copy-request-as-curl', () => codeSnippetController.copyAsCurl()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client.switch-environment', () => environmentController.switchEnvironment()));
        context.subscriptions.push(vscode_1.commands.registerCommand('rest-client._openDocumentLink', args => {
            vscode_1.workspace.openTextDocument(vscode_1.Uri.file(args.path)).then(vscode_1.window.showTextDocument, error => {
                vscode_1.window.showErrorMessage(error.message);
            });
        }));
        context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider('http', new httpCompletionItemProvider_1.HttpCompletionItemProvider()));
        context.subscriptions.push(vscode_1.languages.registerHoverProvider('http', new customVariableHoverProvider_1.CustomVariableHoverProvider()));
        context.subscriptions.push(vscode_1.languages.registerCodeLensProvider('http', new httpCodeLensProvider_1.HttpCodeLensProvider()));
        context.subscriptions.push(vscode_1.languages.registerDocumentLinkProvider('http', new documentLinkProvider_1.RequestBodyDocumentLinkProvider()));
        context.subscriptions.push(vscode_1.languages.registerDefinitionProvider('http', new customVariableDefinitionProvider_1.CustomVariableDefinitionProvider()));
        context.subscriptions.push(vscode_1.languages.registerReferenceProvider('http', new customVariableReferenceProvider_1.CustomVariableReferenceProvider()));
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map