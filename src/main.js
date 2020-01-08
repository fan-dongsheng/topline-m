import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // rem适配

// vant组件
import './utils/register-vant'
import './styles/index.less' // 引入全局样式,放在第三方样式之后

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
