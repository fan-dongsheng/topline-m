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
        <channel-edit
         :channels="channels"
         @switch='trans'
         :active='active'
         />
          </van-popup>
  </div>
</template>

<script>
// 这里引入一个函数必须加{}大括号
import { getChannels } from '@/api/channel' // 引入频道接口
import articleList from './components/article-list' // 引入首页面的list文章列表;
import channelEdit from './components/channel-edit' // 引入弹层频道编辑组件
import { getItem } from '@/utils/storage' // 引入本地存储,为了获取本地的channels的数据
export default {
  data () {
    return {
      active: 0,
      channels: [], // 我的频道列表
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
      // 数据持久化操作; 若果本地有就用本地数据,没有就掉接口;

      try {
        // 1.定义空数组,用于接收本地或接口返回数据;
        let userChannel = []
        // 2.调用本地存储的数据
        const localChannel = getItem('channels')
        // console.log(localChannel)

        // 3.判断数据有没有
        if (localChannel) {
          userChannel = localChannel
        } else {
          const { data } = await getChannels()
          userChannel = data.data.channels
          console.log('成功', data)
        }
        // 将当前组件的channels频道 赋值
        this.channels = userChannel
      } catch (error) {
        console.log('获取频道失败', error)
      }
    },
    // 首页弹层关闭,并传递值,改变频道标签显示; 子传父过来的值,用于改变首页弹层;
    trans (index) {
      this.show = false // 关闭弹层;
      this.active = index // 传递下标,并显示
    }
  },
  created () {
    this.getChannelHome()
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
    font-size: 20px;
}
.van-popup--bottom{
  padding-top: 40px;
}

}

</style>
