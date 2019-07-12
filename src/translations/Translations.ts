import { workspace } from 'vscode'

export default class Translations {
  public static DEFAULT_TRANSLATIONS = {
    noNoteFound: 'No note found',
    dropdownText: 'Notes found:'
  }

  public static getTranslation(key: string): string {
    let lang: any = workspace.getConfiguration('provision').get('translations', Translations.DEFAULT_TRANSLATIONS)
    if(!lang[key]) return ''
    return lang[key]
  }
}