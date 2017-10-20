"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const arrayUtility_1 = require("../common/arrayUtility");
const requestParserFactory_1 = require("../models/requestParserFactory");
const httpClient_1 = require("../httpClient");
const httpRequest_1 = require("../models/httpRequest");
const configurationSettings_1 = require("../models/configurationSettings");
const persistUtility_1 = require("../persistUtility");
const httpResponseTextDocumentContentProvider_1 = require("../views/httpResponseTextDocumentContentProvider");
const responseUntitledFileContentProvider_1 = require("../views/responseUntitledFileContentProvider");
const decorator_1 = require("../decorator");
const variableProcessor_1 = require("../variableProcessor");
const requestStore_1 = require("../requestStore");
const responseStore_1 = require("../responseStore");
const selector_1 = require("../selector");
const Constants = require("../constants");
const os_1 = require("os");
const elegantSpinner = require('elegant-spinner');
const spinner = elegantSpinner();
const filesize = require('filesize');
const uuid = require('node-uuid');
class RequestController {
    constructor() {
        this._previewUri = vscode_1.Uri.parse('rest-response://authority/response-preview');
        this._durationStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._sizeStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._restClientSettings = new configurationSettings_1.RestClientSettings();
        this._httpClient = new httpClient_1.HttpClient(this._restClientSettings);
        this._responseTextProvider = new httpResponseTextDocumentContentProvider_1.HttpResponseTextDocumentContentProvider(this._restClientSettings);
        this._registration = vscode_1.workspace.registerTextDocumentContentProvider('rest-response', this._responseTextProvider);
        vscode_1.workspace.onDidCloseTextDocument((params) => this.onDidCloseTextDocument(params));
    }
    run(range) {
        return __awaiter(this, void 0, void 0, function* () {
            let editor = vscode_1.window.activeTextEditor;
            if (!editor || !editor.document) {
                return;
            }
            // Get selected text of selected lines or full document
            let selectedText = new selector_1.Selector().getSelectedText(editor, range);
            if (!selectedText) {
                return;
            }
            // remove comment lines
            let lines = selectedText.split(/\r?\n/g);
            selectedText = lines.filter(l => !Constants.CommentIdentifiersRegex.test(l)).join(os_1.EOL);
            if (selectedText === '') {
                return;
            }
            // remove file variables definition lines
            lines = selectedText.split(/\r?\n/g);
            selectedText = arrayUtility_1.ArrayUtility.skipWhile(lines, l => Constants.VariableDefinitionRegex.test(l) || l.trim() === '').join(os_1.EOL);
            // variables replacement
            selectedText = yield variableProcessor_1.VariableProcessor.processRawRequest(selectedText);
            // parse http request
            let httpRequest = new requestParserFactory_1.RequestParserFactory().createRequestParser(selectedText).parseHttpRequest(selectedText, editor.document.fileName, this._restClientSettings.useTrunkedTransferEncodingForSendingFileContent);
            if (!httpRequest) {
                return;
            }
            yield this.runCore(httpRequest);
        });
    }
    rerun() {
        return __awaiter(this, void 0, void 0, function* () {
            let httpRequest = requestStore_1.RequestStore.getLatest();
            if (!httpRequest) {
                return;
            }
            yield this.runCore(httpRequest);
        });
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestStore_1.RequestStore.isCompleted()) {
                return;
            }
            this.clearSendProgressStatusText();
            // cancel current request
            requestStore_1.RequestStore.cancel();
            this._durationStatusBarItem.command = null;
            this._durationStatusBarItem.text = 'Cancelled $(circle-slash)';
            this._durationStatusBarItem.tooltip = null;
        });
    }
    runCore(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestId = uuid.v4();
            requestStore_1.RequestStore.add(requestId, httpRequest);
            // clear status bar
            this.setSendingProgressStatusText();
            // set http request
            try {
                let response = yield this._httpClient.send(httpRequest);
                // check cancel
                if (requestStore_1.RequestStore.isCancelled(requestId)) {
                    return;
                }
                this.clearSendProgressStatusText();
                this.formatDurationStatusBar(response);
                this.formatSizeStatusBar(response);
                this._sizeStatusBarItem.show();
                let previewUri = this.generatePreviewUri();
                responseStore_1.ResponseStore.add(previewUri.toString(), response);
                this._responseTextProvider.update(this._previewUri);
                try {
                    if (this._restClientSettings.previewResponseInUntitledDocument) {
                        responseUntitledFileContentProvider_1.UntitledFileContentProvider.createHttpResponseUntitledFile(response, this._restClientSettings.showResponseInDifferentTab, this._restClientSettings.previewResponseSetUntitledDocumentLanguageByContentType, this._restClientSettings.includeAdditionalInfoInResponse, this._restClientSettings.suppressResponseBodyContentTypeValidationWarning);
                    }
                    else {
                        yield vscode_1.commands.executeCommand('vscode.previewHtml', previewUri, vscode_1.ViewColumn.Two, `Response(${response.elapsedMillionSeconds}ms)`);
                    }
                }
                catch (reason) {
                    vscode_1.window.showErrorMessage(reason);
                }
                // persist to history json file
                let serializedRequest = httpRequest_1.SerializedHttpRequest.convertFromHttpRequest(httpRequest);
                yield persistUtility_1.PersistUtility.saveRequest(serializedRequest);
            }
            catch (error) {
                // check cancel
                if (requestStore_1.RequestStore.isCancelled(requestId)) {
                    return;
                }
                if (error.code === 'ETIMEDOUT') {
                    error.message = `Please check your networking connectivity and your time out in ${this._restClientSettings.timeoutInMilliseconds}ms according to your configuration 'rest-client.timeoutinmilliseconds'. Details: ${error}. `;
                }
                else if (error.code === 'ECONNREFUSED') {
                    error.message = `Connection is being rejected. The service isn’t running on the server, or a firewall is blocking requests. Details: ${error}.`;
                }
                else if (error.code === 'ENETUNREACH') {
                    error.message = `You don't seem to be connected to a network. Details: ${error}`;
                }
                this.clearSendProgressStatusText();
                this._durationStatusBarItem.command = null;
                this._durationStatusBarItem.text = '';
                vscode_1.window.showErrorMessage(error.message);
            }
            finally {
                requestStore_1.RequestStore.complete(requestId);
            }
        });
    }
    dispose() {
        this._durationStatusBarItem.dispose();
        this._sizeStatusBarItem.dispose();
        this._registration.dispose();
    }
    generatePreviewUri() {
        let uriString = 'rest-response://authority/response-preview';
        if (this._restClientSettings.showResponseInDifferentTab) {
            uriString += `/${Date.now()}`; // just make every uri different
        }
        return vscode_1.Uri.parse(uriString);
    }
    setSendingProgressStatusText() {
        this.clearSendProgressStatusText();
        this._interval = setInterval(() => {
            this._durationStatusBarItem.text = `Waiting ${spinner()}`;
        }, 50);
        this._durationStatusBarItem.tooltip = 'Waiting Response';
        this._durationStatusBarItem.show();
    }
    clearSendProgressStatusText() {
        clearInterval(this._interval);
        this._sizeStatusBarItem.hide();
    }
    onDidCloseTextDocument(doc) {
        // Remove the status bar associated with the response preview uri
        if (this._restClientSettings.showResponseInDifferentTab) {
            return;
        }
        if (responseStore_1.ResponseStore.get(doc.uri.toString())) {
            this._durationStatusBarItem.hide();
            this._sizeStatusBarItem.hide();
        }
    }
    formatDurationStatusBar(response) {
        this._durationStatusBarItem.command = null;
        this._durationStatusBarItem.text = ` $(clock) ${response.elapsedMillionSeconds}ms`;
        this._durationStatusBarItem.tooltip = [
            'Breakdown of Duration:',
            `Socket: ${response.timingPhases.wait.toFixed(1)}ms`,
            `DNS: ${response.timingPhases.dns.toFixed(1)}ms`,
            `TCP: ${response.timingPhases.tcp.toFixed(1)}ms`,
            `FirstByte: ${response.timingPhases.firstByte.toFixed(1)}ms`,
            `Download: ${response.timingPhases.download.toFixed(1)}ms`
        ].join(os_1.EOL);
    }
    formatSizeStatusBar(response) {
        this._sizeStatusBarItem.text = ` $(database) ${filesize(response.bodySizeInBytes + response.headersSizeInBytes)}`;
        this._sizeStatusBarItem.tooltip = `Breakdown of Response Size:${os_1.EOL}Headers: ${filesize(response.headersSizeInBytes)}${os_1.EOL}Body: ${filesize(response.bodySizeInBytes)}`;
    }
}
__decorate([
    decorator_1.trace('Request')
], RequestController.prototype, "run", null);
__decorate([
    decorator_1.trace('Rerun Request')
], RequestController.prototype, "rerun", null);
__decorate([
    decorator_1.trace('Cancel Request')
], RequestController.prototype, "cancel", null);
exports.RequestController = RequestController;
//# sourceMappingURL=requestController.js.map