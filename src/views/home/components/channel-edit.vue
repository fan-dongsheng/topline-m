<template>
  <div class="channeledit">
      <!-- //首页弹层频道编辑组件 -->

        <van-cell title="我的频道" :border="false" >
            <van-button round
            style="background:red;color:#fff;"
            slot="right-icon"
            size="mini"
            @click="eidtShow=!eidtShow"
            >{{eidtShow?'完成':'编辑'}}</van-button>

        </van-cell>
        <!-- 宫格内容 -->
        <van-grid :gutter="10" >
            <van-grid-item
                v-for="(item,index) in channels"
                :key="item.id"

                :text="item.name"
            >
            <van-icon name="close"
            v-show="eidtShow && index !==0"
             slot="icon"/>
            </van-grid-item>
        </van-grid>

        <van-cell title="频道推荐" :border="false" />
            <van-grid :gutter="10">
            <van-grid-item
                v-for="value in remainingChannels"
                :key="value.id"
                @click="addChannel(value)"
                :text="value.name"
            />
        </van-grid>

  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel' // 引入获取所有频道接口
export default {
  data () {
    return {
      allChannels: [], // 所有频道列表
      eidtShow: false // 让编辑图标显示
    }
  },
  // 从父组件home中拿到channels的数据
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  methods: {

    // 获取全部的频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log('获取全部成功', data)
      this.allChannels = data.data.channels
    },
    addChannel (value) {
      // 点击添加频道推荐到我的频道,点击将当前的value获取,push到数组中;
      this.channels.push(value)
    }

  },
  computed: {
    // 计算剩余频道的
    remainingChannels () {
      const remainChannels = [] // 定义一个空数组接收剩余的频道
      const { allChannels, channels } = this // 结构全部频道 和我的频道;
      console.log(allChannels, channels)

      // 遍历全部频道
      allChannels.forEach(item => {
        // 在我的频道channels中遍历,找到和全部频道一样的 就行排除;
        if (!channels.find(same => same.id === item.id)) {
          remainChannels.push(item)
        }
      })
      return remainChannels
    }
  },
  created () {
    this.loadAllChannels()
  }

}
</script>

<style lang='less' scoped>
/deep/ .van-grid-item__content{
    background:rgb(212, 209, 209);
    position: relative;
    .van-grid-item__icon-wrapper{
        position: absolute;
        top: -10px;
        right: 0;

        .van-icon-close{
            font-size: 14px;
        }

}
}

</style>
