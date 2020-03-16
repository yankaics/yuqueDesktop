// const setLocalStorage = (key, val) => localStorage.setItem(key, val);
export const setLocalStorage = (key, val) => {
  if (typeof val === 'object') {
    localStorage.setItem(key, JSON.stringify(val))
  } else {
    localStorage.setItem(key, val)
  }
}

export const getLocalStorage = (key) => {
  let val = null
  // debugger
  // if (typeof val === 'object') {
  // val = localStorage.getItem(JSON.parse(key))
  // } else {
  val = localStorage.getItem(key)
  // }
  return val;
}

export const delLocalStorage = (key) => {
  localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
  localStorage.clear();
}
