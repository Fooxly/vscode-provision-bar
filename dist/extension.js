/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onDocumentChangeListener = exports.getGroups = exports.getKeywordsByGroup = exports.getKeywords = exports.getCountForGroup = exports.getCountForKeyword = void 0;
const vscode = __webpack_require__(1);
const _1 = __webpack_require__(3);
const getCountForKeyword = (keyword, document, range) => {
    var _a, _b, _c, _d;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return 0;
    // Check if there are settings for the wanted group
    if (!_1.coreConfig.has(`keywords.${keyword}`))
        return 0;
    const keywordProps = _1.coreConfig.get(`keywords.${keyword}`);
    const regex = new RegExp(`\\b(${keyword}${((_c = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.mustIncludeColon) !== null && _c !== void 0 ? _c : true) ? ':' : ''})`, `${((_d = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.caseSensitive) !== null && _d !== void 0 ? _d : true) ? '' : 'i'}gm`);
    let count = 0;
    while (regex.exec(document.getText(range))) {
        count++;
    }
    return count;
};
exports.getCountForKeyword = getCountForKeyword;
const getCountForGroup = (group, document, range) => {
    var _a, _b, _c;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return 0;
    // Check if there are settings for the wanted group
    if (!_1.coreConfig.has(`groups.${group}`)
        || !_1.coreConfig.has('keywords')
        || !((_c = Object.keys(_1.coreConfig.get('keywords'))) === null || _c === void 0 ? void 0 : _c.length))
        return 0;
    let count = 0;
    for (const keyword in _1.coreConfig.get('keywords')) {
        const keywordProps = _1.coreConfig.get(`keywords.${keyword}`);
        if (!(keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) || (keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) !== group)
            continue;
        count += (0, exports.getCountForKeyword)(keyword, document);
    }
    return count;
};
exports.getCountForGroup = getCountForGroup;
const getKeywords = () => {
    // TODO: notify user if there are no keywords
    // Check if there are keywords
    if (!_1.coreConfig.has('keywords'))
        return [];
    const keywords = _1.coreConfig.get('keywords');
    return Object.keys(keywords);
};
exports.getKeywords = getKeywords;
const getKeywordsByGroup = (group) => {
    var _a;
    // TODO: notify user if there are no keywords
    // Check if there are keywords
    if (!_1.coreConfig.has('keywords'))
        return [];
    const keywords = _1.coreConfig.get('keywords');
    const result = [];
    for (const keyword in keywords) {
        if (((_a = keywords[keyword]) === null || _a === void 0 ? void 0 : _a.group) === group)
            result.push(keyword);
    }
    return result;
};
exports.getKeywordsByGroup = getKeywordsByGroup;
const getGroups = () => {
    var _a, _b, _c;
    // TODO: notify user if there are no groups
    // Check if there are groups
    if (!_1.coreConfig.has('keywords'))
        return [];
    const keywords = _1.coreConfig.get('keywords');
    const result = [];
    for (const keyword in keywords) {
        if ((_b = (_a = keywords[keyword]) === null || _a === void 0 ? void 0 : _a.group) === null || _b === void 0 ? void 0 : _b.length)
            result.push((_c = keywords[keyword]) === null || _c === void 0 ? void 0 : _c.group);
    }
    return result;
};
exports.getGroups = getGroups;
const onDocumentChangeListener = (context, callback) => {
    vscode.window.onDidChangeActiveTextEditor(() => {
        callback();
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(() => {
        callback();
    }, null, context.subscriptions);
};
exports.onDocumentChangeListener = onDocumentChangeListener;
exports["default"] = {
    getCountForKeyword: exports.getCountForKeyword,
    getCountForGroup: exports.getCountForGroup,
    getKeywords: exports.getKeywords,
    getKeywordsByGroup: exports.getKeywordsByGroup,
    getGroups: exports.getGroups,
    onDocumentChangeListener: exports.onDocumentChangeListener
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destroy = exports.initialize = exports.coreConfig = void 0;
const vscode = __webpack_require__(1);
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
exports["default"] = {
    initialize: exports.initialize,
    destroy: exports.destroy
};


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
const DocumentHelper_1 = __webpack_require__(2);
const ProVision_1 = __webpack_require__(3);
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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map