import Provision from './Provision'
import { Disposable, ExtensionContext, commands } from 'vscode'
import Document from './document/Document'
import DropdownManager from './DropdownManager'

export default class ProvisionCommands extends Provision {
  private commands: Map<string, Disposable> = new Map<string, Disposable>()
  private context: ExtensionContext

  constructor(context: ExtensionContext) {
    super()
    this.context = context
  }

  public initialize(): Disposable[] | undefined {
    for(let group of this.settings.get<any[]>('notes' ,[])) {
      let groupID = ''
      for(let item of group.keywords) {
        groupID += item.keyword
      }
      this.registerCommand('provision.list.' + groupID, () => {
        let notes = Document.instance.getListOfDocumentNotes(undefined, [group])
        if(!notes) return
        DropdownManager.instance.showListNotes(DropdownManager.instance.convertDocumentItemsToQuickPickItems(notes[0].items))
      })
    }
    return
  }

  public configChanged() {
    super.configChanged()
    // set all the commands again
  }

  public dispose() {
    this.commands.forEach(d => {
      d.dispose()
    })
    super.dispose()
  }

  private registerCommand(uri: string, callback: (...args: any[]) => any) : Disposable | undefined {
    if(this.commands.get(uri)) return
    let dis = commands.registerCommand(uri, callback)
    this.context.subscriptions.push(dis)
    this.commands.set(uri, dis)
    return dis
  }
}