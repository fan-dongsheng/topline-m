// 封装 axios 请求模块;
import axios from 'axios'
import jsonBig from 'json-bigint' // 处理后端返回数据超出安全整数范围;
import store from '@/store' // store导出的是store实例组件,可以直接store.state获取  和this.$store一样
import router from '@/router'

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
    // console.log('转换失败', error)
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
}, async function (error) {
  // 对响应错误做点什么
  // 响应拦截,如果token过期返回401,就得重新刷新新token
  // 思路:1.如果没有token或也没有refresh_token,那就直接返回登录页;2.如果有就请求刷新refsh_token;3.存储到容器中;4.重新请求接口

  // 首先判断返回状态
  if (error.response && error.response.status === 401) {
    // 1.如果没有token或也没有refresh_token,那就直接返回登录页;
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }

    try {
      // 有refsh_token就重新刷新
      const { data } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }

      })
      // 设置新的token
      store.commit('getUserToken', {
        ...user, // 拓展对象符 让user对象中其他的数据不变
        token: data.data.token // 只更新token
      })
      // 再次请求数据,必须返回
      // error.config包含错误请求所有的配置数据,比如method,url
      return request(error.config)
    } catch (error) {
      redirectLogin()
    }
  }

  return Promise.reject(error)
})

// 封装登录页面
function redirectLogin () {
  return router.push({
    name: 'login',
    // query参数会以?key=value&key=value的格式添加到url后
    // router.currentRoute.fullPath 代表当前的路由地址   router.currentRoute:当前路由组件
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
