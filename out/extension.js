"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const DocumentHelper_1 = require("./ProVision/DocumentHelper");
const ProVision_1 = require("./ProVision");
const statusbarItems = new Map();
let config = undefined;
function activate(context) {
    // Initialize the ProVision Core
    ProVision_1.default.initialize();
    // Setup all the configruation settings
    handleConfigUpdate();
    // Update based on document change
    (0, DocumentHelper_1.onDocumentChangeListener)(context, handleUpdate);
    // Begin the first update cycle
    handleUpdate();
}
exports.activate = activate;
function deactivate() {
    removeAllGroups();
    ProVision_1.default.destroy();
}
exports.deactivate = deactivate;
const handleUpdate = () => {
    var _a, _b;
    // If there is no active document, the items should be removed
    if (!((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document)) {
        removeAllGroups();
        return;
    }
    for (const group of (0, DocumentHelper_1.getGroups)()) {
        const count = (0, DocumentHelper_1.getCountForGroup)(group, (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document);
        if (count === 0)
            removeGroup(group);
        else
            updateGroup(group, count);
    }
};
// Update an statusbar group or create if it doesn't exist
const updateGroup = (group, counter) => {
    var _a, _b, _c, _d, _e, _f;
    let item;
    // Check if the item already exists, otherwise create a new one
    if (statusbarItems.has(group)) {
        item = statusbarItems.get(group);
    }
    else {
        item = vscode.window.createStatusBarItem(((_b = (_a = config === null || config === void 0 ? void 0 : config.get) === null || _a === void 0 ? void 0 : _a.call(config, 'bar.side')) !== null && _b !== void 0 ? _b : 'left') === 'left' ?
            vscode.StatusBarAlignment.Left :
            vscode.StatusBarAlignment.Right, 10);
    }
    // Check if the item actually exists
    if (!item)
        return;
    const groupProps = (_c = config === null || config === void 0 ? void 0 : config.get('groups')) === null || _c === void 0 ? void 0 : _c[group];
    // Update the props of the statusbar item
    item.name = group;
    if ((_d = groupProps === null || groupProps === void 0 ? void 0 : groupProps.tooltip) === null || _d === void 0 ? void 0 : _d.length)
        item.tooltip = groupProps.tooltip;
    else
        item.tooltip = group.charAt(0).toUpperCase() + group.slice(1).toLowerCase();
    item.text = (!(groupProps === null || groupProps === void 0 ? void 0 : groupProps.title)
        ? group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()
        : typeof groupProps.title === 'string'
            ? groupProps.title.replace('{0}', counter.toString())
            : counter === 1 && ((_e = groupProps.title['1']) === null || _e === void 0 ? void 0 : _e.length)
                ? groupProps.title['1'].replace('{0}', counter.toString())
                : groupProps.title['*'].replace('{0}', counter.toString()));
    if ((_f = groupProps === null || groupProps === void 0 ? void 0 : groupProps.backgroundStyle) === null || _f === void 0 ? void 0 : _f.length)
        item.backgroundColor = new vscode.ThemeColor(groupProps.backgroundStyle);
    item.command = {
        command: 'ProVision.listGroup',
        arguments: [group],
        title: group,
    };
    statusbarItems.set(group, item);
    item.show();
};
// Remove an existing statusbar group
const removeGroup = (group) => {
    const item = statusbarItems.get(group);
    if (!item)
        return;
    item.dispose();
    statusbarItems.delete(group);
};
const removeAllGroups = () => {
    for (const group of statusbarItems.keys())
        removeGroup(group);
};
const handleConfigUpdate = () => {
    config = vscode.workspace.getConfiguration('ProVision');
    handleUpdate();
};
//# sourceMappingURL=extension.js.map