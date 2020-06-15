import electron from 'electron'
const { dialog } = electron.remote

/**
 * 提示信息对话框
 * @param {*} message 消息内容
 * @param {*} title 标题，默认“提示信息”
 */
export const msgInfo = (message = "", title = "提示信息") => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

/**
 * 错误信息对话框
 * @param {*} message 消息内容
 * @param {*} title 标题，默认“错误信息”
 */
export const msgErr = (message = "", title = "错误信息") => {
  dialog.showMessageBox({
    type: 'error',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

/**
 * 警告信息对话框
 * @param {*} message 消息内容
 * @param {*} title 标题，默认“警告信息”
 */
export const msgWarn = (message = "", title = "警告信息") => {
  dialog.showMessageBox({
    type: 'warning',
    buttons: ['确定'],
    defaultId: 0,
    title,
    message
  })
}

/**
 * 询问信息对话框
 * @param {*} message 消息内容
 * @param {*} title 标题，默认“询问信息”
 */
export const msgYesNo = (message = "", title = "询问信息") => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['取消', '确定'],
    defaultId: 0,
    title,
    message
  })
}