import * as vscode from 'vscode';

export let coreConfig: vscode.WorkspaceConfiguration;

const disposables = [];

// Initializes the ProVision Core
export const initialize = () => {
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

// Destroys everything the core has created
export const destroy = () => {
    // Unregister help and list commands
};

const handleConfigUpdate = () => {
    coreConfig = vscode.workspace.getConfiguration('ProVision');
};

export default {
    initialize,
    destroy
};
