<template>
  <div class="home-container">
      <!-- //导航 -->
        <van-nav-bar title="首页" />
        <van-tabs v-model="active">
            <van-tab v-for="item in channels"
             :key="item.id"
             :title="item.name"
             >
             <!-- 将每个频道传给子组件list,让子组件知道是哪个频道数据 -->
             <article-list :channel='item'/>
             </van-tab>

        </van-tabs>
  </div>
</template>

<script>
// 这里引入一个函数必须加{}大括号
import { getChannels } from '@/api/channel' // 引入频道接口
import articleList from './components/article-list' // 引入首页面的list文章列表;
export default {
  data () {
    return {
      active: 1,
      channels: [] // 频道列表
    }
  },
  components: {
    articleList
  },
  methods: {
    // 获取频道列表
    async getChannelHome () {
      try {
        const { data } = await getChannels()
        this.channels = data.data.channels
        console.log('成功', data)
      } catch (error) {
        console.log('获取频道失败', error)
      }
    }
  },
  created () {
    if (this.$store.state.user) {
      this.getChannelHome()
    }
  }

}
</script>

<style>

</style>
