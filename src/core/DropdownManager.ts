import { window, QuickPickItem } from 'vscode'
import Document from './document/Document'

export default class DropdownManager {
  private static _instance: DropdownManager
  static get instance(): DropdownManager {
    if(!this._instance) this._instance = new DropdownManager()
    return this._instance
  }

  public showListNotes(items: QuickPickItem[]) {
    
    window.showQuickPick(items, {
      canPickMany: false,
      placeHolder: 'Dropdown placeholder TODO'
    }).then(v => {
      if(!v) return
      Document.instance.moveToLine(Number(v.label) - 1)
    })
  }

  public convertDocumentItemsToQuickPickItems(items: any[]): QuickPickItem[] {
    let r: QuickPickItem[] = []
    for(let a in items) {
      // r.push({
      //   label: a.index,
      //   detail: 
      // })
    }
    return r
  }
}
