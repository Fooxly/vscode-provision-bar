import { commands, StatusBarItem, window, StatusBarAlignment } from 'vscode'
import Main from '../core/Main'
import BaseCommands from '../core/BaseCommands'
import Document from '../core/document'
import { DocumentListener } from '../core/document/DocumentListener'
import Utils from '../core/Utils'

export default class Hub extends Main implements DocumentListener {
  public document?: Document
  private items: Map<string, StatusBarItem> = new Map<string, StatusBarItem>()
  private data?: any
  private showWhenEmpty: boolean = false

  protected initialize() {
    this.document = new Document(this)
    this.document.addListener(this)

    // Provision wide commands
    commands.getCommands().then(e => {
      if(e.indexOf('provision.help') === -1) {
        this.registerCommand('provision.help', () => BaseCommands.Help(), false)
        this.registerCommand('provision.list', () => BaseCommands.List(this, this.data), false)
      }
    })
  }

  protected configChanged() {
    if(this.items) {
      this.items.forEach((val, key) => {
        this.removeItem(key)
      })
    }
    this.showWhenEmpty = this.config.get('showWhenEmpty', false)
    let keywords: any = this.config.get('keywords', {})
    Object.keys(keywords).forEach((keyword: string) => {
      let groupId: any = Utils.getGroup(this, keyword)
      this.registerCommand('provision.popup.' + groupId, () => BaseCommands.Popup(this, this.data[groupId]), true)
    
    })
  }

  protected dispose() {
    if(this.items) this.items.forEach(i => i.dispose())
   }

  public update(data?: any) {
    this.data = data
    if(data) {
      for(let group in data) {
        if(data[group].items.length === 0 && !this.showWhenEmpty) {
          this.removeItem(group)
        } else {
          this.createItem(group, data[group])
        }
      }
    } else {
      this.dispose()
    }
  }

  public detailedUpdate(data?: any)  { }

  private removeItem(group: string) {
    let g = this.items.get(group)
    if(!g) return
    g.dispose()
    this.items.delete(group)
  }

  private createItem(group: string, data: any) {
    let item: StatusBarItem | undefined
    if(this.items.has(group)) {
      item = this.items.get(group)
    } else {
      let pos = this.config.get('bar.position', 'left')
      item = window.createStatusBarItem((pos === 'left' ? StatusBarAlignment.Left : StatusBarAlignment.Right), this.config.get('bar.priority', 1))
    }

    if(item) {
      let props = Utils.getGroupProps(this, group)
      if(props.tooltip && props.tooltip.length) item.tooltip = props.tooltip
      let title = Utils.getTitle(group, props.title, data.amount)
      item.text = title
      item.command = this.getUUID() + 'provision.popup.' + group
      this.items.set(group, item)
      item.show()
    }
  }
}