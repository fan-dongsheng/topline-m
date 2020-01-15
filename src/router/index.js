import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 引入组件

Vue.use(VueRouter)

const routes = [
  // 登录页面路由
  {
    path: '/login',
    component: Login
  },
  // tab底部导航栏
  {
    path: '/',
    component: () => import('@/views/tab-bar'),
    // 子路由,四个页面
    children: [
      {
        path: '', // 默认子路由,什么都不写的时候默认显示
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 用户页面路由;
  {
    path: '/user/:id',
    component: () => import('@/views/user')

  },
  // 搜索路由
  {
    path: '/search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
