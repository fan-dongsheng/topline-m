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
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  data () {
    return {
      active: 0 // 控制激活的标签选项
    }
  }
}
</script>

<style>

</style>
