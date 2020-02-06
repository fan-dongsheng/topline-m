<template>
  <div class="my-article">
      <!-- 导航栏 -->
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <van-tabs v-model="active">
      <van-tab title="我的收藏">
           <collect-article />
      </van-tab>
      <van-tab title="我的历史">
          <history-article />
      </van-tab>
      <van-tab title="我的作品">
        <user-article />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
import CollectArticle from './components/collect'
import HistoryArticle from './components/history'
export default {
  props: {
    type: {
      type: String // 接收动态路由参数
    }
  },
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  data () {
    // 点击的进入也免得时候展现当前的active
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 如果数组没有找到内容,就会返回-1,也就是作品(2)
    }
    return {

      active: active// 控制激活的标签选项
    }
  }
}
</script>

<style>

</style>
