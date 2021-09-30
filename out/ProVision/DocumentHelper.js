"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDocumentChangeListener = exports.getGroups = exports.getKeywordsByGroup = exports.getKeywords = exports.getCountForGroup = exports.getCountForKeyword = void 0;
const vscode = require("vscode");
const _1 = require(".");
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
exports.default = {
    getCountForKeyword: exports.getCountForKeyword,
    getCountForGroup: exports.getCountForGroup,
    getKeywords: exports.getKeywords,
    getKeywordsByGroup: exports.getKeywordsByGroup,
    getGroups: exports.getGroups,
    onDocumentChangeListener: exports.onDocumentChangeListener
};
//# sourceMappingURL=DocumentHelper.js.map