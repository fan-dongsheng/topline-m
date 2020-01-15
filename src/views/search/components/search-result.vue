<template>
  <div class="search-result">
      <!-- //搜索工具的list列表数据,单独管理 -->
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
  </div>
</template>

<script>
import { getSearchList } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  props: {
    // 搜索list的参数
    q: {
      type: String,
      required: true
    }
  },
  methods: {

    async onLoad () {
      // 异步更新数据
      const { data } = await getSearchList({
        page: this.page, // 页数
        per_page: this.per_page, // 每页数量
        q: this.q
      })
      // 2.接收数据

      // 解构赋值就用{} 直接解构数据
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }

  }

}
</script>

<style>

</style>
