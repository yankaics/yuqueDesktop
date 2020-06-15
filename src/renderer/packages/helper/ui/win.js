import electron from 'electron'
// const path = require('path');
const ele = electron.remote

// const ipc = ele.ipcMain

export const openWinModal = ({ url, winName }) => {
  return new Promise((resolve, reject) => {
    const { BrowserWindow } = ele;
    const mainWin = ele.getCurrentWindow();
    let child = new BrowserWindow({ parent: mainWin, modal: true, show: false })
    child.loadURL(url)
    child.once('ready-to-show', () => {
      if (winName) child.winName = winName;
      window.openedWin.push(child);
      child.show()
      resolve(child)
      // console.log(child.webContents.getURL())
      // setTimeout(() => {
      //   child.close();
      //   console.log('1')
      // }, 3000);
    })
  })

}

/**
 * 刷新主窗口页面
 * @param {String} url 页面地址，不指定默认当前页面
 */
export const refreshMainWindow = (url) => {
  if (!url) {
    url = electron.remote.getCurrentWebContents().getURL()
  }
  electron.remote.getCurrentWindow().loadURL(url)
}

/**
 * 关闭所有窗口
 */
export const closeAllModalWindow = () => {
  const winArr = window.openedWin;
  for (const win of winArr) {
    win.close()
  }
}

/**
 * 根据窗口名称关闭窗口
 * @param {*} winName 
 */
export const closeModalWin = (winName) => {
  const winArr = window.openedWin.filter(win => win.winName === winName);
  for (const win of winArr) {
    win.close()
  }
}

// export default {
//   openWinModal
// }

export const openNewWin = (url) => {
  const { BrowserWindow } = ele;
  const mainWin = ele.getCurrentWindow();
  let child = new BrowserWindow({ parent: mainWin, modal: false, show: true })
  child.loadURL(url)
  child.once('ready-to-show', () => {
    // window.openedWin.push(child);
    // child.show()
    // console.log(child.webContents.getURL())
    // setTimeout(() => {
    //   child.close();
    //   console.log('1')
    // }, 3000);
  })




  // const { BrowserWindow } = electron;
  // const win = ele.getCurrentWindow();
  // let newwin;
  // ipc.on('createWindow', () => {
  //   newwin = new BrowserWindow({
  //     width: 800,
  //     height: 600,
  //     frame: false,
  //     parent: win, //win是主窗口
  //   })
  //   newwin.loadURL(url); //new.html是新开窗口的渲染进程
  //   newwin.on('closed', () => { newwin = null })

  // })
}