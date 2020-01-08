import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 引入组件

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
