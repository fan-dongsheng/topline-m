<template>
  <div class="channeledit">
      <!-- //首页弹层频道编辑组件 -->

        <van-cell title="我的频道" :border="false" >
                <van-button round style="background:red;color:#fff;" slot="right-icon" size="mini">编辑</van-button>

        </van-cell>
        <!-- 宫格内容 -->
        <van-grid :gutter="10">
            <van-grid-item
                v-for="item in channel"
                :key="item.id"

                :text="item.name"
            />
        </van-grid>

        <van-cell title="频道编辑" :border="false" />
            <van-grid :gutter="10">
            <van-grid-item
                v-for="value in 8"
                :key="value"

                text="文字"
            />
        </van-grid>

  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel' // 引入获取所有频道接口
export default {
  data () {
    return {
      allChannels: [] // 所有频道列表
    }
  },
  // 从父组件home中拿到channels的数据
  props: {
    channel: {
      type: Array,
      required: true
    }
  },
  methods: {

    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log('获取全部成功', data)
      this.allChannels = data.data.channels
    }

  },
  created () {
    this.loadAllChannels()
  }

}
</script>

<style lang='less' scoped>

</style>
