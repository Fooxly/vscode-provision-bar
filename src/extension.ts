
import { ExtensionContext, extensions, workspace } from 'vscode'
import Hub from './main/Hub'

var hub: Hub

export function activate(context: ExtensionContext) {
	convert()
	hub = new Hub(context, 'provision.bar')
}

export function deactivate() {
	hub._dispose()
}

function convert() {
	const current = workspace.getConfiguration('provision')
	if(!current.get('notes', []).length) return
	if(Object.keys(current.get('keywords', {})).length) return

	// create new
	const keywords: any = {}
	const groups: any = []
	for(const o of current.get<any>('notes', [])) {
		const group: any = {
			keywords: [],
			tooltip: o.tooltip
		}
		for(const kw of o.keywords) {
			group.keywords.push(kw.keyword)
			keywords[kw.keyword] = {
				caseSensitive: kw.caseSensitive ? kw.caseSensitive : true,
				includesColon: kw.useColons ? kw.useColons : true
			}
		}
		group.title = {
			'*': typeof o.text === 'object' ? o.text.multiple : o.text
		}
		if(typeof o.text === 'object') group.title['1'] = o.text.one
		groups.push(group)
	}

	current.update('keywords', keywords)
	current.update('groups', groups)
}
