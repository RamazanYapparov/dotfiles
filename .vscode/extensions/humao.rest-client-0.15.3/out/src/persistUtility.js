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
const Constants = require("./constants");
const fs = require("fs");
const path = require("path");
const os = require("os");
class PersistUtility {
    static saveRequest(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requests = yield PersistUtility.deserializeFromHistoryFile();
                requests.unshift(httpRequest);
                requests = requests.slice(0, Constants.HistoryItemsMaxCount);
                yield PersistUtility.serializeToHistoryFile(requests);
            }
            catch (error) {
            }
        });
    }
    static loadRequests() {
        return PersistUtility.deserializeFromHistoryFile();
    }
    static saveEnvironment(environment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PersistUtility.createFileIfNotExistsAsync(PersistUtility.environmentFilePath);
            yield PersistUtility.serializeToEnvironmentFile(environment);
        });
    }
    static loadEnvironment() {
        return PersistUtility.deserializeFromEnvironmentFile();
    }
    static createFileIfNotExists(path) {
        try {
            fs.statSync(path);
        }
        catch (error) {
            PersistUtility.ensureDirectoryExistence(path);
            fs.writeFileSync(path, '');
        }
    }
    static createFileIfNotExistsAsync(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, err => {
                if (err === null) {
                    resolve();
                }
                new Promise((resolve, reject) => {
                    PersistUtility.ensureDirectoryExistence(path);
                    fs.writeFile(path, '', err => err === null ? resolve(path) : reject(err));
                }).then(_ => resolve());
            });
        });
    }
    static serializeToEnvironmentFile(environment) {
        return new Promise((resolve, reject) => {
            fs.writeFile(PersistUtility.environmentFilePath, JSON.stringify(environment), error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
    static deserializeFromEnvironmentFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(PersistUtility.environmentFilePath, (error, data) => {
                if (error) {
                    PersistUtility.createFileIfNotExistsAsync(PersistUtility.environmentFilePath).then(_ => resolve(null));
                    return;
                }
                else {
                    let fileContent = data.toString();
                    if (fileContent) {
                        resolve(JSON.parse(fileContent));
                        return;
                    }
                    resolve(null);
                }
            });
        });
    }
    static serializeToHistoryFile(requests) {
        return new Promise((resolve, reject) => {
            fs.writeFile(PersistUtility.historyFilePath, JSON.stringify(requests), error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
    static deserializeFromHistoryFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(PersistUtility.historyFilePath, (error, data) => {
                if (error) {
                    PersistUtility.createFileIfNotExistsAsync(PersistUtility.historyFilePath).then(_ => resolve(PersistUtility.emptyHttpRequestItems));
                }
                else {
                    let fileContent = data.toString();
                    if (fileContent) {
                        try {
                            resolve(JSON.parse(fileContent));
                            return;
                        }
                        catch (error) {
                        }
                    }
                    resolve(PersistUtility.emptyHttpRequestItems);
                }
            });
        });
    }
    static ensureDirectoryExistence(filePath) {
        let dirname = path.dirname(filePath);
        if (PersistUtility.directoryExists(dirname)) {
            return true;
        }
        PersistUtility.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
    static directoryExists(path) {
        try {
            return fs.statSync(path).isDirectory();
        }
        catch (err) {
            return false;
        }
    }
}
PersistUtility.historyFilePath = path.join(os.homedir(), Constants.ExtensionFolderName, Constants.HistoryFileName);
PersistUtility.cookieFilePath = path.join(os.homedir(), Constants.ExtensionFolderName, Constants.CookieFileName);
PersistUtility.environmentFilePath = path.join(os.homedir(), Constants.ExtensionFolderName, Constants.EnvironmentFileName);
PersistUtility.emptyHttpRequestItems = [];
exports.PersistUtility = PersistUtility;
//# sourceMappingURL=persistUtility.js.map