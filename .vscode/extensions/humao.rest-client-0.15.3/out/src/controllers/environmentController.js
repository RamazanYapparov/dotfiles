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
const configurationSettings_1 = require("../models/configurationSettings");
const environmentPickItem_1 = require("../models/environmentPickItem");
const persistUtility_1 = require("../persistUtility");
const Constants = require("../constants");
const decorator_1 = require("../decorator");
class EnvironmentController {
    constructor(initEnvironment) {
        this._environmentStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
        this._environmentStatusBarItem.command = 'rest-client.switch-environment';
        this._environmentStatusBarItem.text = initEnvironment.label;
        this._environmentStatusBarItem.tooltip = 'Switch REST Client Environment';
        this._environmentStatusBarItem.show();
        this._restClientSettings = new configurationSettings_1.RestClientSettings();
    }
    switchEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentEnvironment = yield EnvironmentController.getCurrentEnvironment();
            let itemPickList = [];
            itemPickList.push(EnvironmentController.noEnvironmentPickItem);
            for (let name in this._restClientSettings.environmentVariables) {
                let item = new environmentPickItem_1.EnvironmentPickItem(name, name);
                if (item.name === currentEnvironment.name) {
                    item.description = '$(check)';
                }
                itemPickList.push(item);
            }
            let item = yield vscode_1.window.showQuickPick(itemPickList, { placeHolder: "Select REST Client Environment" });
            if (!item) {
                return;
            }
            this._environmentStatusBarItem.text = item.label;
            yield persistUtility_1.PersistUtility.saveEnvironment(item);
        });
    }
    static getCurrentEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentEnvironment = yield persistUtility_1.PersistUtility.loadEnvironment();
            if (!currentEnvironment) {
                currentEnvironment = EnvironmentController.noEnvironmentPickItem;
                yield persistUtility_1.PersistUtility.saveEnvironment(currentEnvironment);
            }
            return currentEnvironment;
        });
    }
    static getCustomVariables(environment = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!environment) {
                environment = yield EnvironmentController.getCurrentEnvironment();
            }
            let settings = new configurationSettings_1.RestClientSettings();
            for (let environmentName in settings.environmentVariables) {
                if (environmentName === environment.name) {
                    return settings.environmentVariables[environmentName];
                }
            }
            return new Map();
        });
    }
    dispose() {
    }
}
EnvironmentController.noEnvironmentPickItem = new environmentPickItem_1.EnvironmentPickItem('No Environment', Constants.NoEnvironmentSelectedName, 'DO NOT Use Any Environment');
__decorate([
    decorator_1.trace('Switch Environment')
], EnvironmentController.prototype, "switchEnvironment", null);
exports.EnvironmentController = EnvironmentController;
//# sourceMappingURL=environmentController.js.map