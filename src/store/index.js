import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

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
      state.user = user
      // 将数据存入本地存储中 以便持久化保存;为了方便就将本地存储封装起来,storage.js

      setItem(USER_KEY, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
