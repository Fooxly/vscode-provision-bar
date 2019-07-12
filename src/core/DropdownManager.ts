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

  public convertDocumentItemsToQuickPickItems(type: DropdownType, items: any[]): QuickPickItem[] {
    let r: QuickPickItem[] = []
    for(let n of items) {
      switch(type) {
        case DropdownType.NORMAL: {
          r.push({
            label: (n.position.line + 1).toString(),
            detail: n.text,
            description: n.keyword
          })
          break
        }
        case DropdownType.COMPACT: {
          r.push({
            label: (n.position.line + 1).toString(),
            description: n.text
          })
          break
        }
      }
    }
    return r
  }
}

export enum DropdownType {
  NORMAL = 'normal',
  COMPACT = 'compact'
}
