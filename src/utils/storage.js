// 本地存储模块
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
