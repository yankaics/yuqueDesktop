'use strict'

import { app, BrowserWindow } from 'electron'
const path = require('path');

const __DEV__ = process.env.NODE_ENV === 'development';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (__DEV__) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = __DEV__
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '/static/img/logo.png'),
    height: 640,
    // useContentSize: true,
    width: 1000,
    minWidth: 1000,
    minHeight: 640,
    titleBarStyle: 'hidden', // 隐藏标题栏
    // frame: false
    webPreferences: { webSecurity: false }, // 解决跨域
  })

  // mainWindow.loadURL(winURL)
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (__DEV__) {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.once("devtools-opened", () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // console.log(process.platform)
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
