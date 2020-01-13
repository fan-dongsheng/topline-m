<template>
    <!-- 首页的频道展示文章列表 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >

        <van-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.title"
        />
    </van-list>

</template>

<script>
import { getHomeArticle } from '@/api/article' // 引入文章列表接口
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 时间戳 ,用于请求下一次列表的
      with_top: '' // 是否置顶
    }
  },
  // 接收父传子的属性;
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据

      const { data } = await getHomeArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 第一次传肯定是新的时间戳
        // 事件戳,请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        // 每次请求会返回时间戳,若果有就请求历史的,没有就当前的;
        with_top: 1 // 默认为没有
      })
      console.log(data)

      // 将数据添加到list列表中
      const { results } = data.data

      this.list.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      // 如果请求的当前数据的内容有就继续加载其他页面,给事件戳赋值
      if (results.length) {
        this.timestamp = data.data.pre_timestamp // 后台的pre_timestamp,更新获取下一页时间戳
      } else {
        this.finished = true
      }
    }
  }

}
</script>

<style>

</style>
