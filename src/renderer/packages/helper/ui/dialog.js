import electron from 'electron'
const { dialog } = electron.remote

/**
 * 提示信息对话框
 * @param {*} message 消息内容
 * @param {*} title 标题
 */
export const msgInfo = (message = "", title = "提示信息") => {
  console.log(electron.remote)
  dialog.showMessageBox({
    type: 'info',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

export const msgErr = (message = "", title = "错误信息") => {
  dialog.showMessageBox({
    type: 'error',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

export const msgWarn = (message = "", title = "警告信息") => {
  dialog.showMessageBox({
    type: 'warning',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

export const msgYesNo = (message = "", title = "询问信息") => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['取消', '确定'],
    defaultId: 0,
    title,
    message
  })
}