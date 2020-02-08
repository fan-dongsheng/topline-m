import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 引入组件

Vue.use(VueRouter)

const routes = [
  // 登录页面路由
  {
    path: '/login',
    component: Login,
    name: 'login'
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
  // 用户资料
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  },
  // 小智
  {
    path: '/user/chat',
    component: () => import('@/views/user-chat')
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
  },
  // 文章详情
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true // 将路由动态参数映射到组件的 props 中，更推荐这种做法//  就是this.$route.params.id这个

  },
  // 用户作品
  {
    path: '/my-article/:type?', // ?代表这个动态参数可有可无
    component: () => import('@/views/user-articles'),
    props: true
  }
  // 用户收藏
  // {
  //   path: '/my-article/collect',
  //   component: () => import('@/views/user-articles')
  // },
  // 用户历史
  // {
  //   path: '/my-article/history',
  //   component: () => import('@/views/user-articles')
  // }
]

const router = new VueRouter({
  routes
})

export default router
