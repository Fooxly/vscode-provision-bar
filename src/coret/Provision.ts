import { WorkspaceConfiguration, Disposable, workspace } from 'vscode';

export default abstract class Provision {
  protected settings: WorkspaceConfiguration
  protected disposables?: Disposable[]

  constructor() {
    this.settings = workspace.getConfiguration('provision')
  }

  public initialize(): Disposable[] | undefined { return }
  public dispose() {
    if(!!this.disposables) {
      this.disposables.forEach(d => {
        d.dispose()
      })
    }
  }
  public onUpdate(data: any) { }
  public configChanged() { 
    this.settings = workspace.getConfiguration('provision')
  }
  public changedDocument() { }
}