# ProVision Manual

## Table of contents

1. [Introduction](#introduction)
2. [Setup](#📙-setup)
    1. [Keywords property](#keywords-property)
    2. [Groups property](#groups-property)
3. [General settings](#⚙️-general-settings)
4. [Commands](#📕-commands)
5. [Extensions](#📦-extensions)
    1. [ProVision: Bar](#provision-bar)
    2. [ProVision: Syntax](#provision-syntax)
    3. [ProVision: Lens](#provision-lens)

## Introduction

ProVision is a collection of VSCode extesions which provide a better overview for you. All of our extensions will be **highly customizable** and sve you a lot of time searching, unfolding or navigating towards notes.

## 📙 Setup

### Keywords property

Setting up keywords is quite simple, inside your settings you should have/create the `ProVision.keywords` object which will hold all of your keywords.

Here is an example of a keyword:

```json
"ProVision.keywords": {
    ...,
    "TODO": {
        "color": "#fff",
        "backgroundColor": "#f2b01f",
        "rulerPlacement": "right",
        "rulerColor": "rgba(242, 176, 31, 0.8)",
        "highlight": "keyword",
        "group": "todos",
    },
}
```

Now let us explain the properties to you. All of the properties are **optional**.

- `Color`: The color which the keyword should have inside the document.
- `backgroundColor`: The background color which the keyword should have inside the document.
- `rulerPlacement`:
- `rulerColor`:
- `highlight`:
- `group`: In which group the keyword should be placed.

### Groups property

The groups property allows you to customize a group which you specified inside a keyword.
To start customizing the appearance of your groups, create the `ProVision.groups` object.

**It's important to remember that the group names are case sensitive.**<br/>
Here is an example of a group:

```json
"ProVision.groups": {
    ...,
    "todos": {
        "title": "$(info) {0}",
        "tooltip": "All my notes",
        "foregroundStyle": "statusBarItem.warningForeground",
        "backgroundStyle": "statusBarItem.warningBackground"
    },
}

OR

"ProVision.groups": {
    ...,
    "todos": {
        "title": {
            "1": "1 Note",
            "*": "{0} Notes"
        },
        "tooltip": "All my notes",
        "foregroundStyle": "#FFFFFF",
        "backgroundStyle": "statusBarItem.warningBackground"
    },
}
```

*Note: $(info) and many other icons from the vscode icon theme can be used.*

Now let us explain the properties to you. All of the properties are **optional**.

**General properties:**

- `title`: This can be a string or object to specify the title which will be shown to you.
- `tooltip`: Shown when hovering over the statusbar and code lens item.

**Provision: Bar specific properties:**

- `foregroundStyle`: Adds a foreground color to the statusbar item.<br/>
**Note:** Hex codes or [Theme Color](https://code.visualstudio.com/api/references/theme-color) possible.
- `backgroundStyle`: Adds a background color to the statusbar item.<br/>
**Note:** only [Theme Color](https://code.visualstudio.com/api/references/theme-color) possible.

## ⚙️ General settings

- `ProVision.list.moveOnSingleResult`: Jump to the note instantly when there are is only 1 result.

    ```json
    "ProVision.list.moveOnSingleResult": <true|false>
    ```

## 📕 Commands

- `Help: ProVision` Shows you the manual you are currently reading.
<br/>

## 📦 Extensions

### ProVision: Bar

**ProVision: Bar** provides **easy to use** and **highly customizable** buttons to your statusbar. When opening a file it will search for the provided keywords and show you a simple overview of your notes. When clicking on a group you get an overview of all your notes in the specified group.

#### Groups

Every keyword which has the **group** property will be searched for and added to the statusbar. If you would like to add custom styling for the group you can use the [ProVision.groups](#groups-property) property which is explained above.

#### Settings

- `ProVision.bar.side`: On which side of the statusbar the items should appear.

    ```json
    "ProVision.bar.side": <"left"|"right">
    ```

- `ProVision.bar.priority`: The priority the items get inside the statusbar.

    ```json
    "ProVision.bar.priority": <number>
    ```

### ProVision: Syntax

### ProVision: Lens
