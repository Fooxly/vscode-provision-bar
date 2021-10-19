import * as vscode from 'vscode';

import { getCountForGroup, onDocumentChangeListener } from './ProVision/DocumentHelper';
import { getGroups } from './ProVision/utils';
import { Group } from './ProVision/types';
import ProVision from './ProVision';

const statusbarItems = new Map<string, vscode.StatusBarItem>();
const disposables: vscode.Disposable[] = [];
let enabled = true;
let config: vscode.WorkspaceConfiguration | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
	// Initialize the ProVision Core
	ProVision.initialize(context);

	disposables.push(vscode.commands.registerCommand('ProVision.bar.toggle', handleToggle));

	// Setup all the configruation settings
	handleConfigUpdate();
	// Listen for config changes to apply
	vscode.workspace.onDidChangeConfiguration(() => {
		handleConfigUpdate();
	});
	// Update based on document change
	onDocumentChangeListener(context, handleUpdate);
	// Begin the first update cycle
	handleUpdate();
}

export function deactivate() {
	removeAllGroups();
	for (const disposable of disposables) {
        disposable.dispose();
    }
	ProVision.destroy();
}

const handleToggle = () => {
	enabled = !enabled;
	if (!enabled) {
		removeAllGroups();
	}
	handleUpdate();
};

const handleUpdate = () => {
	if (!enabled) return;
	// If there is no active document, the items should be removed
	if (!vscode.window.activeTextEditor?.document) {
		removeAllGroups();
		return;
	}

	for (const group of getGroups()) {
		const count = getCountForGroup(group, vscode.window.activeTextEditor?.document as vscode.TextDocument);
		if (count === 0) removeGroup(group);
		else updateGroup(group, count);
	}
};

// Update an statusbar group or create if it doesn't exist
const updateGroup = (group: string, counter: number) => {
	let item: vscode.StatusBarItem | undefined;
	// Check if the item already exists, otherwise create a new one
	if (statusbarItems.has(group)) {
		item = statusbarItems.get(group);
	} else {
		item = vscode.window.createStatusBarItem(
			(config?.get?.('bar.side') ?? 'left') === 'left' ?
				vscode.StatusBarAlignment.Left :
				vscode.StatusBarAlignment.Right,
				config?.get?.('bar.priority') === undefined ? 10 : config?.get?.('bar.priority'));
	}
	// Check if the item actually exists
	if (!item) return;
	const groupProps: Group | undefined = config?.get<any | undefined>('groups')?.[group];
	
	// Update the props of the statusbar item
	item.name = group;
	if (groupProps?.tooltip?.length) item.tooltip = groupProps.tooltip;
	else item.tooltip = group.charAt(0).toUpperCase() + group.slice(1).toLowerCase();
	item.text = (
		!groupProps?.title
			? `${group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()} (${counter})`
			: typeof groupProps.title === 'string'
				? groupProps.title.replace('{0}', counter.toString())
				: counter === 1 && groupProps.title['1']?.length
					? groupProps.title['1'].replace('{0}', counter.toString())
					: groupProps.title['*'].replace('{0}', counter.toString())
	);
	if (groupProps?.foregroundStyle?.length) item.color = groupProps?.foregroundStyle[0] === '#' ? groupProps?.foregroundStyle : new vscode.ThemeColor(groupProps.foregroundStyle);
	if (groupProps?.backgroundStyle?.length) item.backgroundColor = new vscode.ThemeColor(groupProps.backgroundStyle);
	item.command = {
		command: 'ProVision.listGroup',
		arguments: [group],
		title: group,
	};
	statusbarItems.set(group, item);
	item.show();
};

// Remove an existing statusbar group
const removeGroup = (group: string) => {
	const item = statusbarItems.get(group);
	if (!item) return;
	item.dispose();
	statusbarItems.delete(group);
};

const removeAllGroups = () => {
	for (const group of statusbarItems.keys()) removeGroup(group);
};

const handleConfigUpdate = () => {
	config = vscode.workspace.getConfiguration('ProVision');
	handleUpdate();
};
