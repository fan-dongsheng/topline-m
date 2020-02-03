// 封装本地存储;
export const getItem = name => {
  // 获取的name需要转为json对象;
  // 判断是不是json格式,不是就会报错,原数据返回;用trycatch
  try {
    return JSON.parse(window.localStorage.getItem(name))
  } catch (error) {
    console.log('转换失败', error)

    return window.localStorage.getItem(name)
  }
}
export const setItem = (name, value) => {
  console.log(name)
  // 如果传来的值不是json格式的数据对象,就要原数据返回 ,用typeof判断是不是对象;
  // 是对象要转成字符串;本地存储存字符串
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(name, data)
}
export const removeItem = () => {
  window.localStorage.removeItem(name)
}
