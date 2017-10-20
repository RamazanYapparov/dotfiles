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
const responseStore_1 = require("../responseStore");
const mimeUtility_1 = require("../mimeUtility");
const persistUtility_1 = require("../persistUtility");
const configurationSettings_1 = require("../models/configurationSettings");
const decorator_1 = require("../decorator");
const Constants = require("../constants");
const fs = require("fs");
const path = require("path");
const os = require("os");
let cp = require('copy-paste');
let mime = require('mime-types');
class ResponseController {
    constructor() {
        this._restClientSettings = new configurationSettings_1.RestClientSettings();
    }
    save(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                return;
            }
            let response = responseStore_1.ResponseStore.get(uri.toString());
            if (response !== undefined) {
                let fullResponse = this.getFullResponseString(response);
                let filePath = path.join(ResponseController.responseSaveFolderPath, `Response-${Date.now()}.http`);
                try {
                    yield persistUtility_1.PersistUtility.createFileIfNotExistsAsync(filePath);
                    fs.writeFileSync(filePath, fullResponse);
                    vscode_1.window.showInformationMessage(`Saved to ${filePath}`, { title: 'Open' }, { title: 'Copy Path' }).then(function (btn) {
                        if (btn) {
                            if (btn.title === 'Open') {
                                vscode_1.workspace.openTextDocument(filePath).then(vscode_1.window.showTextDocument);
                            }
                            else if (btn.title === 'Copy Path') {
                                cp.copy(filePath);
                            }
                        }
                    });
                }
                catch (error) {
                    vscode_1.window.showErrorMessage(`Failed to save latest response to ${filePath}`);
                }
            }
        });
    }
    saveBody(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                return;
            }
            let response = responseStore_1.ResponseStore.get(uri.toString());
            if (response !== undefined) {
                let contentType = response.getResponseHeaderValue("content-type");
                let extension = this.getExtension(contentType);
                let fileName = !extension ? `Response-${Date.now()}` : `Response-${Date.now()}.${extension}`;
                let filePath = path.join(ResponseController.responseBodySaveFolderPath, fileName);
                try {
                    yield persistUtility_1.PersistUtility.createFileIfNotExistsAsync(filePath);
                    fs.writeFileSync(filePath, response.bodyStream);
                    vscode_1.window.showInformationMessage(`Saved to ${filePath}`, { title: 'Open' }, { title: 'Copy Path' }).then(function (btn) {
                        if (btn) {
                            if (btn.title === 'Open') {
                                vscode_1.workspace.openTextDocument(filePath).then(vscode_1.window.showTextDocument);
                            }
                            else if (btn.title === 'Copy Path') {
                                cp.copy(filePath);
                            }
                        }
                    });
                }
                catch (error) {
                    vscode_1.window.showErrorMessage(`Failed to save latest response body to ${filePath}`);
                }
            }
        });
    }
    dispose() {
    }
    getFullResponseString(response) {
        let statusLine = `HTTP/${response.httpVersion} ${response.statusCode} ${response.statusMessage}${os.EOL}`;
        let headerString = '';
        for (let header in response.headers) {
            if (response.headers.hasOwnProperty(header)) {
                headerString += `${header}: ${response.headers[header]}${os.EOL}`;
            }
        }
        let body = '';
        if (response.body) {
            body = `${os.EOL}${response.body}`;
        }
        return `${statusLine}${headerString}${body}`;
    }
    getExtension(contentType) {
        let mimeType = mimeUtility_1.MimeUtility.parse(contentType);
        let contentTypeWithoutCharsets = `${mimeType.type}${mimeType.suffix}`;
        // Check if user has custom mapping for this content type first
        if (contentTypeWithoutCharsets in this._restClientSettings.mimeAndFileExtensionMapping) {
            let ext = this._restClientSettings.mimeAndFileExtensionMapping[contentTypeWithoutCharsets];
            ext = ext.replace(/^(\.)+/, "");
            if (ext) {
                return ext;
            }
        }
        return mime.extension(contentType);
    }
}
ResponseController.responseSaveFolderPath = path.join(os.homedir(), Constants.ExtensionFolderName, Constants.DefaultResponseDownloadFolderName);
ResponseController.responseBodySaveFolderPath = path.join(os.homedir(), Constants.ExtensionFolderName, Constants.DefaultResponseBodyDownloadFolerName);
__decorate([
    decorator_1.trace('Response-Save')
], ResponseController.prototype, "save", null);
__decorate([
    decorator_1.trace('Response-Save-Body')
], ResponseController.prototype, "saveBody", null);
exports.ResponseController = ResponseController;
//# sourceMappingURL=responseController.js.map