// 封装 axios 请求模块;
import axios from 'axios'
import jsonBig from 'json-bigint' // 处理后端返回数据超出安全整数范围;
import store from '@/store' // store导出的是store实例组件,可以直接store.state获取  和this.$store一样

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基础路径
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
    return {}
  }
}]

// 添加token请求拦截器;统一处理发送请求需要在headers中带token
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 配置config;将令牌token配置上
    const { user } = store.state
    if (user) {
      // config.headers 获取操作请求头对象
      // Authorization 是后端要求的字段名称
      // 数据值后端要求提供：Bearer token数据
      // 注意：Bearer 后面有个空格
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
