/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const DocumentHelper_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './ProVision/DocumentHelper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const utils_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './ProVision/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const ProVision_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './ProVision'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const statusbarItems = new Map();
let config = undefined;
function activate(context) {
    // Initialize the ProVision Core
    ProVision_1.default.initialize(context);
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
    for (const group of (0, utils_1.getGroups)()) {
        const count = (0, DocumentHelper_1.getCountForGroup)(group, (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document);
        if (count === 0)
            removeGroup(group);
        else
            updateGroup(group, count);
    }
};
// Update an statusbar group or create if it doesn't exist
const updateGroup = (group, counter) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let item;
    // Check if the item already exists, otherwise create a new one
    if (statusbarItems.has(group)) {
        item = statusbarItems.get(group);
    }
    else {
        item = vscode.window.createStatusBarItem(((_b = (_a = config === null || config === void 0 ? void 0 : config.get) === null || _a === void 0 ? void 0 : _a.call(config, 'bar.side')) !== null && _b !== void 0 ? _b : 'left') === 'left' ?
            vscode.StatusBarAlignment.Left :
            vscode.StatusBarAlignment.Right, ((_c = config === null || config === void 0 ? void 0 : config.get) === null || _c === void 0 ? void 0 : _c.call(config, 'bar.priority')) === undefined ? 10 : (_d = config === null || config === void 0 ? void 0 : config.get) === null || _d === void 0 ? void 0 : _d.call(config, 'bar.priority'));
    }
    // Check if the item actually exists
    if (!item)
        return;
    const groupProps = (_e = config === null || config === void 0 ? void 0 : config.get('groups')) === null || _e === void 0 ? void 0 : _e[group];
    // Update the props of the statusbar item
    item.name = group;
    if ((_f = groupProps === null || groupProps === void 0 ? void 0 : groupProps.tooltip) === null || _f === void 0 ? void 0 : _f.length)
        item.tooltip = groupProps.tooltip;
    else
        item.tooltip = group.charAt(0).toUpperCase() + group.slice(1).toLowerCase();
    item.text = (!(groupProps === null || groupProps === void 0 ? void 0 : groupProps.title)
        ? `${group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()} (${counter})`
        : typeof groupProps.title === 'string'
            ? groupProps.title.replace('{0}', counter.toString())
            : counter === 1 && ((_g = groupProps.title['1']) === null || _g === void 0 ? void 0 : _g.length)
                ? groupProps.title['1'].replace('{0}', counter.toString())
                : groupProps.title['*'].replace('{0}', counter.toString()));
    if ((_h = groupProps === null || groupProps === void 0 ? void 0 : groupProps.foregroundStyle) === null || _h === void 0 ? void 0 : _h.length)
        item.color = (groupProps === null || groupProps === void 0 ? void 0 : groupProps.foregroundStyle[0]) === '#' ? groupProps === null || groupProps === void 0 ? void 0 : groupProps.foregroundStyle : new vscode.ThemeColor(groupProps.foregroundStyle);
    if ((_j = groupProps === null || groupProps === void 0 ? void 0 : groupProps.backgroundStyle) === null || _j === void 0 ? void 0 : _j.length)
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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map