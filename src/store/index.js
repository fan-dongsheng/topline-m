import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode' // 引入解析token的工具

const USER_KEY = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义用户的user为空对象;用于接收返回数据data中的token,refsh_token; 返回数据是一个对象包含这两个数据;
    // user: null // 目前存储的是{token:'',refsh_token:''}
    user: getItem(USER_KEY) // 设置初始化状态,要在这里获取本地存储的token

  },
  mutations: {
    getUserToken (state, user) {
      // 由于需要用到用户的id,后端又没有给,所以需要去解析token,获取id
      // 判断 user有么有值,它的token有没有
      if (user && user.token) {
        console.log(decodeJwt(user.token))
        // 解析出来的数据中必有id,赋值给传来的数据,就获取到了用户id
        user.id = decodeJwt(user.token).user_id
      }

      state.user = user
      // 将数据存入本地存储中 以便持久化保存;为了方便就将本地存储封装起来,storage.js

      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
