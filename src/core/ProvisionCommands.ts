import Provision from './Provision'
import { Disposable, ExtensionContext, commands } from 'vscode'
import Document from './document/Document'

export default class ProvisionCommands extends Provision {
  private commands: Map<string, Disposable> = new Map<string, Disposable>()
  private context: ExtensionContext

  constructor(context: ExtensionContext) {
    super()
    this.context = context
  }

  public initialize(): Disposable[] | undefined {
    console.log(Document.instance.getListOfDocumentNotes())

    return
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