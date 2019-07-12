import * as vscode from 'vscode'
import Document from './core/document/Document'
import Statusbar from './bar/Statusbar';

export function activate(context: vscode.ExtensionContext) {
	let document = new Document(context)
	let statusbar = new Statusbar()
	document.onUpdate(d => {
		statusbar.onUpdate(d)
	})
}

// this method is called when your extension is deactivated
export function deactivate() {}
