
import { ExtensionContext, extensions } from 'vscode'
import Hub from './main/Hub'

var hub: Hub

export function activate(context: ExtensionContext) {
	hub = new Hub(context, 'provision.bar')
}

export function deactivate() {
	hub._dispose()
}
