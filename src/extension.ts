import * as vscode from 'vscode'
import Statusbar from './bar/Statusbar'
import Provision from './core/src/Provision'
import Core from './core/src/Core'
import DropdownCore from './dropdown/src/DropdownCore'

var statusbar: Statusbar

var core: Core
var dropdownCore: DropdownCore

const modules: Provision[] = []

export function activate(context: vscode.ExtensionContext) {
	core = new Core(context)
	dropdownCore = new DropdownCore(context)

	statusbar = new Statusbar()
	modules.push(statusbar)

	
	core.onUpdate(d => {
		modules.forEach(m => m.onUpdate(d))
	})
	
	vscode.workspace.onDidChangeConfiguration(() => {
		dropdownCore.configChanged()
		modules.forEach(m => m.configChanged())
	}, null, context.subscriptions)
	
	modules.forEach(m => m.initialize())
	core.start()
	
	if(!vscode.extensions.getExtension('fooxly.provision-lens')) {
		vscode.commands.executeCommand('setContext', 'provision.bar.canShowContext', true)
		vscode.commands.executeCommand('setContext', 'provision.bar.canUseCommands', true)
	}
}

// this method is called when your extension is deactivated
export function deactivate() {
	core.dispose()
	dropdownCore.dispose()
	modules.forEach(m => m.dispose())
}
