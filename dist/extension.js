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
exports.onDocumentChangeListener = exports.getCountForGroup = exports.getCountForKeyword = exports.getResultsForGroup = exports.getResultsForKeyword = exports.navigateToHitResult = void 0;
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(3);
const navigateToHitResult = (hit, editor) => {
    const editorToUse = editor !== null && editor !== void 0 ? editor : vscode.window.activeTextEditor;
    if (!editorToUse)
        return;
    editorToUse.selection = new vscode.Selection(hit.range.start, hit.range.start);
    editorToUse.revealRange(hit.range, vscode.TextEditorRevealType.InCenter);
};
exports.navigateToHitResult = navigateToHitResult;
const getResultsForKeyword = (keyword, document, range) => {
    var _a, _b, _c, _d, _e, _f;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return [];
    const keywordProps = (0, utils_1.getKeyword)(keyword);
    let result = [];
    const regex = new RegExp(`\\b(${keyword}${((_c = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.mustIncludeColon) !== null && _c !== void 0 ? _c : true) ? ':' : ''})`, `${((_d = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.caseSensitive) !== null && _d !== void 0 ? _d : true) ? '' : 'i'}gm`);
    // Loop over all the regex matches and create HitResults
    let match;
    while (match = regex.exec(document.getText(range))) {
        const pos = document.positionAt(match.index + ((range === null || range === void 0 ? void 0 : range.start) ? document.offsetAt(range === null || range === void 0 ? void 0 : range.start) : 0));
        const hitRange = new vscode.Range(pos, document.positionAt(match.index + ((range === null || range === void 0 ? void 0 : range.start) ? document.offsetAt(range === null || range === void 0 ? void 0 : range.start) : 0) + match[0].length - ((((_e = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.mustIncludeColon) !== null && _e !== void 0 ? _e : true) ? 1 : 0))));
        result.push({
            keyword,
            comment: document.lineAt(pos).text.slice(pos.character).trim(),
            note: document.lineAt(pos).text.slice(pos.character + keyword.length + (((_f = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.mustIncludeColon) !== null && _f !== void 0 ? _f : true) ? 1 : 0)).trim(),
            position: pos,
            range: hitRange,
            lineNumber: pos.line + 1,
        });
    }
    // Sort the results based on line number
    result.sort((last, curr) => {
        if (last.lineNumber < curr.lineNumber)
            return -1;
        if (last.lineNumber > curr.lineNumber)
            return 1;
        return 0;
    });
    return result;
};
exports.getResultsForKeyword = getResultsForKeyword;
const getResultsForGroup = (group, document, range) => {
    var _a, _b;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return [];
    // Get HitResults for all the keywords inside a group
    let result = [];
    const keywords = (0, utils_1.getKeywordsProperty)();
    for (const keyword in keywords) {
        const keywordProps = keywords[keyword];
        if (!(keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) || (keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) !== group)
            continue;
        result.push(...(0, exports.getResultsForKeyword)(keyword, document, range));
    }
    // Sort the results based on line number
    result.sort((last, curr) => {
        if (last.lineNumber < curr.lineNumber)
            return -1;
        if (last.lineNumber > curr.lineNumber)
            return 1;
        return 0;
    });
    return result;
};
exports.getResultsForGroup = getResultsForGroup;
const getCountForKeyword = (keyword, document, range) => {
    var _a, _b, _c, _d;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return 0;
    const keywordProps = (0, utils_1.getKeyword)(keyword);
    const regex = new RegExp(`\\b(${keyword}${((_c = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.mustIncludeColon) !== null && _c !== void 0 ? _c : true) ? ':' : ''})`, `${((_d = keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.caseSensitive) !== null && _d !== void 0 ? _d : true) ? '' : 'i'}gm`);
    let count = 0;
    while (regex.exec(document.getText(range))) {
        count++;
    }
    return count;
};
exports.getCountForKeyword = getCountForKeyword;
const getCountForGroup = (group, document, range) => {
    var _a, _b;
    // Check if there is actualy text to check
    if (!document || !((_b = (_a = document === null || document === void 0 ? void 0 : document.getText) === null || _a === void 0 ? void 0 : _a.call(document, range)) === null || _b === void 0 ? void 0 : _b.length))
        return 0;
    let count = 0;
    for (const keyword of (0, utils_1.getKeywordNames)()) {
        const keywordProps = (0, utils_1.getKeyword)(keyword);
        if (!(keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) || (keywordProps === null || keywordProps === void 0 ? void 0 : keywordProps.group) !== group)
            continue;
        count += (0, exports.getCountForKeyword)(keyword, document, range);
    }
    return count;
};
exports.getCountForGroup = getCountForGroup;
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
    navigateToHitResult: exports.navigateToHitResult,
    getResultsForKeyword: exports.getResultsForKeyword,
    getResultsForGroup: exports.getResultsForGroup,
    getCountForKeyword: exports.getCountForKeyword,
    getCountForGroup: exports.getCountForGroup,
    onDocumentChangeListener: exports.onDocumentChangeListener
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGroups = exports.getKeywordNamesByGroup = exports.getKeywordsProperty = exports.getKeyword = exports.getKeywordNames = void 0;
const _1 = __webpack_require__(4);
const consts_1 = __webpack_require__(7);
// Get a list of all the keywords
const getKeywordNames = () => {
    var _a;
    const keywords = (_a = _1.coreConfig.get('keywords')) !== null && _a !== void 0 ? _a : consts_1.FALLBACK_KEYWORDS;
    return Object.keys(keywords);
};
exports.getKeywordNames = getKeywordNames;
// Get the properties of all the keywords
const getKeyword = (key) => {
    return (0, exports.getKeywordsProperty)()[key];
};
exports.getKeyword = getKeyword;
// Get the keywords property object
const getKeywordsProperty = () => {
    var _a;
    return (_a = _1.coreConfig.get('keywords')) !== null && _a !== void 0 ? _a : consts_1.FALLBACK_KEYWORDS;
};
exports.getKeywordsProperty = getKeywordsProperty;
// Get the keyword names by group
const getKeywordNamesByGroup = (group) => {
    var _a, _b;
    const keywords = (_a = _1.coreConfig.get('keywords')) !== null && _a !== void 0 ? _a : consts_1.FALLBACK_KEYWORDS;
    const result = [];
    for (const keyword in keywords) {
        if (((_b = keywords[keyword]) === null || _b === void 0 ? void 0 : _b.group) === group)
            result.push(keyword);
    }
    return result;
};
exports.getKeywordNamesByGroup = getKeywordNamesByGroup;
const getGroups = () => {
    var _a, _b, _c, _d, _e;
    const keywords = (_a = _1.coreConfig.get('keywords')) !== null && _a !== void 0 ? _a : consts_1.FALLBACK_KEYWORDS;
    const result = [];
    for (const keyword in keywords) {
        if (((_c = (_b = keywords[keyword]) === null || _b === void 0 ? void 0 : _b.group) === null || _c === void 0 ? void 0 : _c.length) && !result.includes((_d = keywords[keyword]) === null || _d === void 0 ? void 0 : _d.group))
            result.push((_e = keywords[keyword]) === null || _e === void 0 ? void 0 : _e.group);
    }
    return result;
};
exports.getGroups = getGroups;
exports["default"] = {
    getKeywordNames: exports.getKeywordNames,
    getKeyword: exports.getKeyword,
    getKeywordsProperty: exports.getKeywordsProperty,
    getKeywordNamesByGroup: exports.getKeywordNamesByGroup,
    getGroups: exports.getGroups,
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destroy = exports.initialize = exports.coreConfig = void 0;
const path = __webpack_require__(5);
const vscode = __webpack_require__(1);
const DocumentHelper_1 = __webpack_require__(2);
const updater_1 = __webpack_require__(6);
const disposables = [];
let extensionContext = undefined;
// Initializes the ProVision Core
const initialize = (context) => {
    extensionContext = context;
    // Setup all the configruation settings
    handleConfigUpdate();
    // Update ProVision if needed
    if (updater_1.default.updateSettings()) {
        handleConfigUpdate();
    }
    // Configuration change listener
    vscode.workspace.onDidChangeConfiguration(() => {
        handleConfigUpdate();
    });
    // Rregister all the commands
    vscode.commands.getCommands().then(commands => {
        if (!commands.includes('ProVision.listGroup'))
            disposables.push(vscode.commands.registerCommand('ProVision.listGroup', handleListGroup));
        if (!commands.includes('ProVision.help'))
            disposables.push(vscode.commands.registerCommand('ProVision.help', handleHelp));
    });
};
exports.initialize = initialize;
// Destroys everything the core has created
const destroy = () => {
    for (const disposable of disposables) {
        disposable.dispose();
    }
};
exports.destroy = destroy;
const handleConfigUpdate = () => {
    exports.coreConfig = vscode.workspace.getConfiguration('ProVision');
};
// Handle the listing of groups
const handleListGroup = (...args) => {
    var _a;
    const group = args[0];
    // Get the items which should be listed
    const hits = (0, DocumentHelper_1.getResultsForGroup)(group, (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document);
    // If there are no hits, show an information message
    if (hits.length === 0) {
        vscode.window.showInformationMessage('No notes found. Good job!');
        return;
    }
    // Move when single result is given and list.moveOnSingleResult is true
    if (hits.length === 1 && exports.coreConfig.get('list.moveOnSingleResult')) {
        (0, DocumentHelper_1.navigateToHitResult)(hits[0]);
        return;
    }
    const listItems = [];
    for (const hit of hits) {
        listItems.push({
            label: `${hit.keyword} (Line: ${hit.lineNumber})`,
            description: hit.note
        });
    }
    // Show the quick picker
    vscode.window.showQuickPick(listItems, {
        canPickMany: false,
        placeHolder: 'Select a note'
    }).then(option => {
        if (!option)
            return;
        // Get the correct hit which was chosen from the list and navigate towards it
        const chosenHit = hits[listItems.indexOf(option)];
        if (!chosenHit) {
            vscode.window.showErrorMessage('Could not find hit result, please try again');
            return;
        }
        (0, DocumentHelper_1.navigateToHitResult)(chosenHit);
    });
};
// Show the help readme for users which need more help
const handleHelp = () => {
    if (!extensionContext)
        return;
    vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(extensionContext.extensionPath, "MANUAL.md")));
};
exports["default"] = {
    initialize: exports.initialize,
    destroy: exports.destroy
};


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const _1 = __webpack_require__(4);
const updateSettings = () => {
    if (_1.coreConfig.has('keywords'))
        return false;
    const oldConfig = vscode.workspace.getConfiguration('provision');
    if (!oldConfig.has('keywords'))
        return false;
    const keywords = JSON.parse(JSON.stringify(oldConfig.get('keywords')));
    let newGroups = {};
    const oldGroups = JSON.parse(JSON.stringify(oldConfig.get('groups')));
    if (oldGroups) {
        for (const oldGroup of oldGroups) {
            for (const groupKeyword of oldGroup.keywords) {
                keywords[groupKeyword].group = oldGroup.keywords[0].toLowerCase();
            }
            newGroups[oldGroup.keywords[0].toLowerCase()] = {
                title: oldGroup.title,
                tooltip: oldGroup.tooltip,
            };
        }
    }
    // Set the new properties
    vscode.workspace.getConfiguration().update('ProVision.keywords', keywords, vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('ProVision.groups', newGroups, vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('ProVision.list.moveOnSingleResult', oldConfig.get('moveOnSingle'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('ProVision.bar.side', oldConfig.get('bar.position'), vscode.ConfigurationTarget.Global);
    vscode.workspace.getConfiguration().update('ProVision.bar.priority', oldConfig.get('bar.priority'), vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage("Hello there, we have just updated ProVision for you. However, there are some setting changes, so if something feels wrong, please check your settings.json or look at our manual via Help: ProVision");
    return true;
};
exports["default"] = {
    updateSettings
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FALLBACK_KEYWORDS = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
exports.FALLBACK_KEYWORDS = {
    TODO: {
        color: "#fff",
        backgroundColor: "#f2b01f",
        rulerPlacement: "right",
        rulerColor: "rgba(242, 176, 31, 0.8)",
        highlight: "keyword",
        group: "notes",
    },
    FIXME: {
        color: "#fff",
        backgroundColor: "#d85f88",
        rulerPlacement: "right",
        rulerColor: "rgba(216, 95, 136, 0.8)",
        highlight: "keyword",
        group: "notes",
    },
    NOTE: {
        color: "#aaa",
        backgroundColor: "#434343",
        rulerPlacement: "right",
        rulerColor: "rgba(67, 67, 67, 0.8)",
        group: "notes",
    },
};
exports["default"] = {
    FALLBACK_KEYWORDS: exports.FALLBACK_KEYWORDS,
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
const utils_1 = __webpack_require__(3);
const ProVision_1 = __webpack_require__(4);
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