"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const azure_account_1 = require("./azure-account");
const opn = require("opn");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle();
function activate(context) {
    const azureLogin = new azure_account_1.AzureLoginHelper(context);
    const subscriptions = context.subscriptions;
    subscriptions.push(createStatusBarItem(azureLogin.api));
    subscriptions.push(vscode_1.commands.registerCommand('azure-account.createAccount', createAccount));
    return azureLogin.api;
}
exports.activate = activate;
function createAccount() {
    opn('https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-azure-account&mktingSource=vscode-azure-account');
}
function createStatusBarItem(api) {
    const statusBarItem = vscode_1.window.createStatusBarItem();
    function updateStatusBar() {
        switch (api.status) {
            case 'LoggingIn':
                statusBarItem.text = localize('azure-account.loggingIn', "Azure: Logging in...");
                statusBarItem.show();
                break;
            case 'LoggedIn':
                if (api.sessions.length) {
                    statusBarItem.text = localize('azure-account.loggedIn', "Azure: {0}", api.sessions[0].userId);
                    statusBarItem.show();
                }
                break;
            default:
                statusBarItem.hide();
                break;
        }
    }
    api.onStatusChanged(updateStatusBar);
    api.onSessionsChanged(updateStatusBar);
    updateStatusBar();
    return statusBarItem;
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map