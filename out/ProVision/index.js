"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.initialize = exports.coreConfig = void 0;
const vscode = require("vscode");
const disposables = [];
// Initializes the ProVision Core
const initialize = () => {
    // Setup all the configruation settings
    handleConfigUpdate();
    // Configuration change listener
    vscode.workspace.onDidChangeConfiguration(() => {
        handleConfigUpdate();
    });
    // Rregister all the commands
    disposables.push(vscode.commands.registerCommand('ProVision.listGroup', (...args) => {
        const group = args[0];
        // TODO: list the values of the group
    }));
};
exports.initialize = initialize;
// Destroys everything the core has created
const destroy = () => {
    // Unregister help and list commands
};
exports.destroy = destroy;
const handleConfigUpdate = () => {
    exports.coreConfig = vscode.workspace.getConfiguration('ProVision');
};
exports.default = {
    initialize: exports.initialize,
    destroy: exports.destroy
};
//# sourceMappingURL=index.js.map