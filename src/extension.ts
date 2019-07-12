import * as vscode from 'vscode'
import Document from './core/document/Document'
import Statusbar from './bar/Statusbar'
import ProvisionCommands from './core/ProvisionCommands'
import Provision from './core/Provision';

var document: Document
var provisionCommands: ProvisionCommands
var statusbar: Statusbar

const modules: Provision[] = []

export function activate(context: vscode.ExtensionContext) {
	document = new Document(context)
	provisionCommands = new ProvisionCommands(context)
	modules.push(provisionCommands)
	statusbar = new Statusbar()
	modules.push(statusbar)
	modules.forEach(m => m.initialize())
	document.onUpdate(d => {
		modules.forEach(m => m.onUpdate(d))
	})
	
	vscode.workspace.onDidChangeConfiguration(() => {		
		document.configChanged()
		modules.forEach(m => m.configChanged())
	}, null, context.subscriptions)

	document.start()
}

// this method is called when your extension is deactivated
export function deactivate() {
	document.dispose()
	modules.forEach(m => m.dispose())
}
