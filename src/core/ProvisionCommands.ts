import Provision from './Provision'
import { Disposable, ExtensionContext, commands, window } from 'vscode'
import Document from './document/Document'
import DropdownManager, { DropdownType } from './DropdownManager'
import Translations from '../translations/Translations'

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
      this.registerCommand('provision.listall', () => {
        let notes = Document.instance.getListOfDocumentNotes()
        let i = []
        if(!notes) return window.showInformationMessage(Translations.getTranslation('noNoteFound'))
        for(let n of notes) {
          i.push(...n.items)
        }
        if(i.length === 0) return window.showInformationMessage(Translations.getTranslation('noNoteFound'))
        if(i.length === 1 && this.settings.get('instant', true)) return Document.instance.moveToLine(i[0].position.line)        
        DropdownManager.instance.showListNotes(DropdownManager.instance.convertDocumentItemsToQuickPickItems(this.settings.get('dropdownType', DropdownType.NORMAL), i))
      })
      this.registerCommand('provision.list.' + groupID, () => {
        let notes = Document.instance.getListOfDocumentNotes(undefined, [group])
        if(!notes || !notes[0].items.length) return window.showInformationMessage(Translations.getTranslation('noNoteFound'))
        if(notes[0].items.length === 1 && this.settings.get('instant', true)) return Document.instance.moveToLine(notes[0].items[0].position.line) 
        DropdownManager.instance.showListNotes(DropdownManager.instance.convertDocumentItemsToQuickPickItems(this.settings.get('dropdownType', DropdownType.NORMAL), notes[0].items))
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