import { TextEditor, ExtensionContext, Selection, TextEditorRevealType, TextDocument, WorkspaceConfiguration, workspace, window, Position, Range, Event, Disposable } from 'vscode'

export default class Document {
  private static _instance: Document
  static get instance(): Document {
    return this._instance
  }
  private currentEditor?: TextEditor
  private context: ExtensionContext
  private settings: WorkspaceConfiguration
  
  private onUpdateEvent: (data: any) => void = () => { }
  private windowEvents: Disposable[] = []


  constructor(context: ExtensionContext) {
    this.context = context
    this.settings = workspace.getConfiguration('provision')
    this.currentEditor = window.activeTextEditor
    this.registerListeners()
    Document._instance = this
  }


  public getListOfDocumentNotes(document?: TextDocument, groups?: any[]): any[] | undefined {
    if(!document && !this.currentEditor) return
    let doc: TextDocument | undefined = (document ? document : this.currentEditor ? this.currentEditor.document : undefined)
    if(!doc) return
    let notes = (groups ? groups : this.settings.get<any[]>('notes' ,[]))
    let results: any[] = []
    let text: string = doc.getText()
    if(text.length === 0) return
    for(let group of notes) {
      let items: any[] = []
      let groupID = ''

      for(let item of group.keywords) {
        groupID += item.keyword
        let match: any
        let regex: RegExp
        if(item.caseSensitive) {
          if(item.useColons) {
            regex = new RegExp(`\\b(${item.keyword}:)`, 'gm')
          } else {
            regex = new RegExp(`\\b(${item.keyword})`, 'gm')
          }
        } else {
          if(item.useColons) {
            regex = new RegExp(`\\b(${item.keyword}:)`, 'igm')
          } else {
            regex = new RegExp(`\\b(${item.keyword})`, 'igm')
          }
        }

        while(match = regex.exec(text)) {
          let pos: Position = doc.positionAt(match.index)
          let text = doc.lineAt(pos).text
          items.push({
            keyword: item.keyword,
            text: text.slice(pos.character, text.length).trim(),
            position: pos,
            range: new Range(pos, doc.positionAt(match.index + match[0].length))
          })
        }
      }
      results.push({
        group: groupID,
        priority: group.priority,
        title: this.createGroupTitle(group.text, items.length),
        tooltip: group.tooltip,
        items
      })
    }

    return results
  }

  private createGroupTitle(group: any, count: number): string {
    let s
    if(typeof group === 'string') {
      s = group
    } else {
      if(count > 1 || count === 0) {
        s = group.multiple
      } else {
        s = group.one
      }
    }
    s = s.replace('{0}', count.toString())
    return s
  }

  public moveToLine(line: number) {
    if(!this.currentEditor) return
    let r = this.currentEditor.document.lineAt(line).range
    this.currentEditor.selection = new Selection(r.start, r.start)
    this.currentEditor.revealRange(r, TextEditorRevealType.InCenter)
  }

  // event listeners
  private registerListeners() {
    window.onDidChangeActiveTextEditor(e => {
      this.currentEditor = e
    }, null, this.context.subscriptions)
  }

  public onUpdate(event: (data: any | undefined) => void) {
    this.onUpdateEvent = event
    this.setupEvents()
  }

  public configChanged() {
    this.settings = workspace.getConfiguration('provision')
    this.setupEvents()
  }

  public dispose() {
    this.windowEvents.forEach(e => {
      e.dispose()
    })
    this.windowEvents = []
  }

  private setupEvents() {
    this.dispose()

    this.windowEvents.push(window.onDidChangeActiveTextEditor(e => {
      if(e && this.currentEditor && e.document === this.currentEditor.document && this.onUpdateEvent) {
        this.onUpdateEvent(this.getListOfDocumentNotes(e.document))
      }
    }, null, this.context.subscriptions))

    this.windowEvents.push(workspace.onDidOpenTextDocument(e => {
      if(this.currentEditor && e === this.currentEditor.document && this.onUpdateEvent) {
        this.onUpdateEvent(this.getListOfDocumentNotes(e))
      }
    }, null, this.context.subscriptions))
    switch(this.settings.get<string>('bar.updateMethod', 'onTextChange')) {
      case 'onTextChange': {
        this.windowEvents.push(workspace.onDidChangeTextDocument(e => {
          if(this.currentEditor && e.document === this.currentEditor.document && this.onUpdateEvent) {
            this.onUpdateEvent(this.getListOfDocumentNotes(e.document))
          }
        }, null, this.context.subscriptions))
        break
      }
      case 'onDocumentSave': {
        this.windowEvents.push(workspace.onDidSaveTextDocument(e => {
          if(this.currentEditor && e === this.currentEditor.document && this.onUpdateEvent) {
            this.onUpdateEvent(this.getListOfDocumentNotes(e))
          }
        }, null, this.context.subscriptions))
        break
      }
    }
  }
}