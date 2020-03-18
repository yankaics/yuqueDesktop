import electron from 'electron'
const { Notification } = electron.remote
const path = require('path');

/**
 * 发起系统通知
 * @param {Object String} args Object{title,body,icon} / String title
 * @param {Function} clickCallback 点击通知栏 
 */
export const notify = (args, clickCallback) => {
  const options = {};
  if (typeof args === 'string') {
    options.title = '语雀桌面版'
    options.body = args
    options.icon = path.join(__static, 'img/ico.ico');
  } else {
    options.title = args.title || '语雀桌面版'
    options.body = args.body || ''
    options.icon = args.icon || path.join(__static, 'img/ico.ico');
  }
  let n = new Notification(options);
  n.show();
  // 监听点击通知栏
  if (clickCallback) {
    n.addListener('click', () => {
      clickCallback();
    })
  }
  return n;
}