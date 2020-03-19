const { remote } = require('electron')
const { Menu, MenuItem } = remote

/**
 * 创建菜单
 * @param {Array<MenuItem>} items 菜单项数组
 */
export const createMenu = (items) => {
  const menu = new Menu()
  for (const item of items) {
    menu.append(new MenuItem(item))
  }
  return menu;
  // menu.append(new MenuItem({ label: '笔记', click() { console.log('item 1 clicked') } }))
  // menu.append(new MenuItem({ type: 'separator' }))
  // menu.append(new MenuItem({ label: '文件夹', click() { } }))
  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault()
  //   menu.popup({ window: remote.getCurrentWindow() })
  //   console.log(menu.items)
  // }, false)

}