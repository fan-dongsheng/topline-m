<template>
  <div class="home-container">

      <!-- //导航 -->
        <van-nav-bar title="首页" fixed/>
        <van-tabs v-model="active">
          <!-- //右侧面包屑 -->
          <van-icon name="wap-nav" slot="nav-right" @click="show=true" />
            <van-tab v-for="item in channels"
             :key="item.id"
             :title="item.name"
             >
             <!-- 将每个频道传给子组件list,让子组件知道是哪个频道数据 -->
             <article-list :channel='item'/>
             </van-tab>

        </van-tabs>
        <!-- 弹层 -->
        <van-popup
          v-model="show"
          position="bottom"
          closeable
          close-icon-position="top-left"
          :style="{ height: '90%' }"
        >
        <!-- //弹层编辑组件 -->
        <channel-edit :channel="channels" />
          </van-popup>
  </div>
</template>

<script>
// 这里引入一个函数必须加{}大括号
import { getChannels } from '@/api/channel' // 引入频道接口
import articleList from './components/article-list' // 引入首页面的list文章列表;
import channelEdit from './components/channel-edit' // 引入弹层频道编辑组件
export default {
  data () {
    return {
      active: 1,
      channels: [], // 频道列表
      show: false // 弹出层
    }
  },
  components: {
    articleList,
    channelEdit
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

<style lang="less" scoped>
.home-container{
  position: relative;
  padding: 90px 0;
  /deep/ .van-tabs__wrap {
  position:fixed;
  top: 46px;
  left:0;
  right:0;
  z-index: 1;
}
.van-icon-wap-nav{
    position: fixed;
    right: 0;
    background: #fff;
    line-height: 44px;
    opacity: 0.9;
}
.van-popup--bottom{
  padding-top: 40px;
}

}

</style>
