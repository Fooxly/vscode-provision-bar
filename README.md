<p align="center">
  <a title="Learn more about the Provision Bar" href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar">
    <img src="https://github.com/Fooxly/vscode-provision-bar/raw/master/assets/icon_banner.png" alt="Provision Bar Logo" width="50%" />
  </a>
</p><br/><br/>

```
ext install fooxly.provision-bar
```

[![Version](https://vsmarketplacebadge.apphb.com/version-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# 🚀 Recently Added

* Options for the position and priority of the statusbar items
* Show all the keywords of the current files in a dropdown
* Localization support
* `Next Note` and `Previous Note` commands (also available in context menu) based on the current cursor position

<p align="center">
  <img src="https://github.com/Fooxly/vscode-provision-bar/raw/master/assets/list_sample.jpg" alt="Provision Bar Example" />
</p>

# 🔍 Provision Bar

The `Provision Bar` provides a simple way to view all of your `notes` in your workspace based on keywords. You'll find one or more items at the statusbar for each file with a quick overview of all your notes.

A package by [Fooxly](https://www.fooxly.com).

## 📕 Features

* Overview of the keywords provided in your settings.json
* **Jump** between notes by using the context menu or commands
* **View** all of your notes in a long and complex file in just seconds

## 📐 Configuration

### Commands

* `Provision: List` Shows all the notes in the current file
* `Provision: Previous Note` Move to the **previous** note based on your cursor position
* `Provision: Next Note` Move to the **next** note based on your cursor position

### Config

You can customize your keywords for the lens and lots of other stuff in your `settings.json` using the following options:

| property                             | type      | default               | options                                                  | description |
| ---                                  | ---       | ---                   | ---                                                      | ----        |
| provision.notes                      | object    | *check below*         | [notes](#Notes)                                          | Object with keywords and settings to use |
| provision.translations               | object    | *check below*         | [translations](#Translations)                            | Object with translations |
| provision.instant                    | boolean   | true                  | true, false                                              | Jump to a note instead of showing the dropdown when there is only one |
| provision.bar.alwaysShow             | boolean   | false                 | true, false                                              | Show the statusbar item(s) when there are no notes |
| provision.dropdownType               | enum      | normal                | compact, normal                                          | The appereance of the dropdown items |
| provision.bar.position               | enum      | left                  | left, right                                              | The position where in the statusbar the information needs to be shown |
| provision.bar.updateMethod           | enum      | onTextChange          | onTextChange, onDocumentSave                             | The method to use for updating the statusbar items |

#### Notes

All keywords need to be defined using the `provision.notes` property. You can customize keywords using the following options:

| property        | type            | default       | options                                                                     | description |
| ---             | ---             | ---           | ---                                                                         | ---         |
| keywords        | array           | *check below* | [keywords](#Keywords)                                                       | All the keywords for the group |
| priority        | number          | *check below* | -                                                                           | The priority the statusbar item will get (higher is more important) |
| text            | object, string  | *check below* | `string` or `{ one: string, multiple: string }`                             | Text for one or multiple results |
| tooltip         | string          | *check below* | -                                                                           | Description used by tooltips |

##### Keywords
| property        | type            | default       | options                                                                     | description |
| ---             | ---             | ---           | ---                                                                         | ---         |
| keyword         | string          | *check below* | -                                                                           | The keyword that needs to be searched for |
| useColons       | boolean         | true          | true, false                                                                 | Use a `:` to define |
| caseSensitive   | boolean         | true          | true, false                                                                 | Use case sensitive detection |

**Default**:

```json
"provision.notes": [
  {
    "keywords": [
      {
        "keyword": "TODO",
        "useColons": true,
        "caseSensitive": true
      },
      {
        "keyword": "FIXME",
        "useColons": true,
        "caseSensitive": true
      }
    ],
    "priority": 10,
    "tooltip": "These are all the 'TODO' and 'FIXME' notes in this file",
    "text": {
      "one": "📝 {0} TODO",
      "multiple": "📝 {0} TODOs"
    }
  },
  {
    "keywords": [
      {
        "keyword": "NOTE",
        "useColons": true,
        "caseSensitive": true
      }
    ],
    "priority": 9,
    "tooltip": "These are all the notes in this file",
    "text": {
      "one": "📝 {0} Note",
      "multiple": "📝 {0} Notes"
    }
  }
]
```

#### Translations

Every line of text provided by this extension can be altered using the `provision.translations` property.

**Default**:

```json
"provision.translations": {
  "noNoteFound": "No note found",
  "dropdownText": "Notes found:"
}
```

## 🖥️ Preview

![Preview](https://github.com/Fooxly/vscode-provision-bar/raw/master/assets/sample.gif)

## ❤️ Support our projects

You can support us by donating through [BuyMeACoffee](https://www.buymeacoffee.com/fooxly) or [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3GEYSYZFXV9GE).

[![BuyMeACoffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/fooxly)&nbsp;&nbsp;&nbsp;
[![PayPal](https://i.imgur.com/T3AmGss.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3GEYSYZFXV9GE)
