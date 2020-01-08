// 封装 axios 请求模块;
import axios from 'axios'
import jsonBig from 'json-bigint' // 处理后端返回数据超出安全整数范围;

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

export default request
// 封装 axios使用问题;
// 1.哪里使用,就在哪里import引用,不方便;
// 2.将请求对象挂载到Vue.prototype 原型对象上, 在组件中通过this.xxx使用, 这不便于维护,修改数据
// 3.推荐使用,将每一个请求都封装为一个独立功能的函数,在需要的时候来进行调用;

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    console.log('转换失败', error)
  }
}]
