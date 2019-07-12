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

  private removeStatusbarItem(group: string) {
    let g = this.existing.get(group)
    if(!g) return
    g.dispose()
    this.existing.delete(group)
  }

  private createStatusbarItem(group: string, data: any): StatusBarItem | undefined {
    if(this.existing.has(group)) return this.existing.get(group)
    let s = window.createStatusBarItem(StatusBarAlignment.Left, 1)
    s.tooltip = data.tooltip
    s.text = data.title
    this.existing.set(group, s)
    s.show()
    return s
  }
}