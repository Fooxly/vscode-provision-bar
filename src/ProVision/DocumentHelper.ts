import * as vscode from 'vscode';
import { coreConfig } from '.';
import { Group, Keyword } from './types';

export const getCountForKeyword = (keyword: string, document?: vscode.TextDocument, range?: vscode.Range): number => {
    // Check if there is actualy text to check
    if (!document || !document?.getText?.(range)?.length) return 0;

	// Check if there are settings for the wanted group
    if (!coreConfig.has(`keywords.${keyword}`)) return 0;

    const keywordProps = coreConfig.get<Keyword>(`keywords.${keyword}`);

    const regex = new RegExp(
        `\\b(${keyword}${keywordProps?.mustIncludeColon ?? true ? ':' : ''})`,
        `${keywordProps?.caseSensitive ?? true ? '' : 'i'}gm`
    );
    let count = 0;
    while (regex.exec(document.getText(range))) {
        count++;
    }
    return count;
};

export const getCountForGroup = (group: string, document?: vscode.TextDocument, range?: vscode.Range): number => {
    // Check if there is actualy text to check
    if (!document || !document?.getText?.(range)?.length) return 0;

	// Check if there are settings for the wanted group
    if (
        !coreConfig.has(`groups.${group}`)
        || !coreConfig.has('keywords')
        || !Object.keys(coreConfig.get<any>('keywords'))?.length
    )
        return 0;

    let count = 0;
    for (const keyword in coreConfig.get<any>('keywords')) {
        const keywordProps = coreConfig.get<Keyword>(`keywords.${keyword}`);
        if (!keywordProps?.group || keywordProps?.group !== group) continue;
        count += getCountForKeyword(keyword, document);
    }
    return count;
};

export const getKeywords = (): string[] => {
	// TODO: notify user if there are no keywords
    // Check if there are keywords
    if (!coreConfig.has('keywords')) return [];
    const keywords = coreConfig.get<any>('keywords');
    return Object.keys(keywords);
};

export const getKeywordsByGroup = (group: string): string[] => {
	// TODO: notify user if there are no keywords
    // Check if there are keywords
    if (!coreConfig.has('keywords')) return [];
    const keywords = coreConfig.get<any>('keywords');
    const result = [];
    for (const keyword in keywords) {
        if (keywords[keyword]?.group === group) result.push(keyword);
    }
    return result;
};

export const getGroups = (): string[] => {
	// TODO: notify user if there are no groups
    // Check if there are groups
    if (!coreConfig.has('keywords')) return [];
    const keywords = coreConfig.get<any>('keywords');
    const result = [];
    for (const keyword in keywords) {
        if (keywords[keyword]?.group?.length) result.push(keywords[keyword]?.group);
    }
    return result;
};

export const onDocumentChangeListener = (context: vscode.ExtensionContext, callback: () => void) => {
	vscode.window.onDidChangeActiveTextEditor(() => {
		callback();
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(() => {
		callback();
	}, null, context.subscriptions);

};

export default {
    getCountForKeyword,
    getCountForGroup,
    getKeywords,
    getKeywordsByGroup,
    getGroups,
    onDocumentChangeListener
};
