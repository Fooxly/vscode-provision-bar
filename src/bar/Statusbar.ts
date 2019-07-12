import Provision from '../core/Provision'
import { StatusBarAlignment, window, StatusBarItem } from 'vscode'

export default class Statusbar extends Provision {
  private existing: Map<string, StatusBarItem> = new Map<string, StatusBarItem>()

  public onUpdate(data: any) {
    for(let group of data) {
      if(group.items.length === 0 && !this.settings.get('bar.alwaysShow', false)) {
        this.removeStatusbarItem(group.group)
      } else {
        let i = this.createStatusbarItem(group.group, group)
        if(i) i.text = group.title
      }
    }
  }

  public configChanged() {
    super.configChanged()
    this.existing.forEach((val, key) => {
      this.removeStatusbarItem(key)
    })
  }

  public dispose() {
    this.existing.forEach(i => {
      i.dispose()
    })
  }

  private removeStatusbarItem(group: string) {
    let g = this.existing.get(group)
    if(!g) return
    g.dispose()
    this.existing.delete(group)
  }

  private createStatusbarItem(group: string, data: any): StatusBarItem | undefined {
    if(this.existing.has(group)) return this.existing.get(group)
    let pos = this.settings.get('bar.position', 'left')
    let s = window.createStatusBarItem((pos === 'left' ? StatusBarAlignment.Left : StatusBarAlignment.Right), this.settings.get('bar.priority', data.priority))
    if(data.tooltip && data.tooltip.length) s.tooltip = data.tooltip
    s.text = data.title
    s.command = 'provision.list.' + group
    this.existing.set(group, s)
    s.show()
    return s
  }
}