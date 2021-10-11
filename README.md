<h1 align="center">
  <a title="ProVision" href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar">
    <img src="https://assets.fooxly.com/extensions/provision/general/icon.png" alt="ProVision" height="150" />
  </a>
  <p>ProVision: Bar</p>
  <p style="color: #A2A2A2; font-size: 18px;">The best way to keep your notes organized</p>
  <br>
  <p style="color: #3366BB; font-size: 14px; font-weight: normal;">
    <a href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision">ProVision Bundle</a>&nbsp;&nbsp;&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision-lens">ProVision: Lens</a>&nbsp;&nbsp;&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar">ProVision: Bar</a>&nbsp;&nbsp;&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=fooxly.provision-syntax">ProVision: Syntax</a>
  </p>
</h1>

[![Version](https://vsmarketplacebadge.apphb.com/version-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating-short/fooxly.provision-bar.svg)](https://marketplace.visualstudio.com/items?itemName=fooxly.provision-bar)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/Fooxly/vscode-provision-bar/blob/master/LICENSE)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

<br />

```sh
ext install fooxly.provision-bar
```

<br />
<p align="center">
  <img src="https://assets.fooxly.com/extensions/provision/bar/example.gif" alt="Preview" width="400" />
</p>
<br />

## What's new in ProVision: Bar 4

* Even quicker load and response times 🚀
* Easier configuration

## ❤️ Support us

<p>
  <a title="BuyMeACoffee" href="https://www.buymeacoffee.com/fooxly">
    <img src="https://assets.fooxly.com/third_party/buymeacoffee.png" alt="BuyMeACoffee" width="180" height="43" />
  </a>&nbsp;&nbsp;
  <a title="Patreon" href="https://www.patreon.com/fooxly">
    <img src="https://assets.fooxly.com/third_party/patreon.png" alt="Patreon" width="180" height="43" />
  </a>&nbsp;&nbsp;
  <a title="PayPal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3GEYSYZFXV9GE">
    <img src="https://assets.fooxly.com/third_party/paypal.png" alt="PayPal" width="180" height="43" />
  </a>
</p>

# ProVision: Bar

> A package by [Fooxly](https://www.fooxly.com).

**ProVision: Bar** provides **easy to use** and **highly customizable** buttons to your statusbar. When opening a file it will search for the provided keywords and show you a simple overview of your notes. When clicking on a group you get an overview of all your notes in the specified group.

## 📐 Features

* Create custom keywords
* Group keywords together
* Show an overview of your notes in the statusbar
* Jump directly to a note
* View all of your notes in a long and complex file **instantly**

## 📙 How to use

You can start using it right away! But if you want to customize it more, you can take a look at our manual via the `Help: ProVision` command.

## 📕 Commands

* `Help: ProVision`: Shows you the manual you are currently reading.
* `ProVision: List All`: Shows you all the notes in the current file.
* `ProVision: List Group`: Shows you all the notes in the current file from a specifc group.
* `ProVision: Toggle Bar`: Toggle the visibility of the statusbar items.

## ⚙️ Available Settings

* `ProVision.keywords`: The keywords will be searched for. _(For setup take a look at our manual)_
* `ProVision.groups`: Custom group appearance. _(For setup take a look at our manual)_
* `ProVision.list.moveOnSingleResult`: Instantly jump to the note when there are is only 1 result.

    ```json
    "ProVision.list.moveOnSingleResult": <true|false>
    ```

* `ProVision.bar.side`: On which side of the statusbar the items should appear.

    ```json
    "ProVision.bar.side": <"left"|"right">
    ```

* `ProVision.bar.priority`: The priority the items get inside the statusbar.

    ```json
    "ProVision.bar.priority": <number>
    ```

## License

[MIT](https://github.com/Fooxly/vscode-provision-bar/blob/master/LICENSE) &copy; Fooxly
