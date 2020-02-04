<template>
  <div class="article-comments">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <comment-item v-for="(item,index) in list" :key="index" :title="item.content" :comment='item'/>
        </van-list>
    </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20

    }
  },
  components: {
    commentItem
  },
  props: {
    // 传来id
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

      })
      console.log(data)
      const results = data.data.results
      this.list.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
