<template>
  <div class="search-container">
      <!-- 首页搜索框 -->
<!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
                background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="showResult=false"
        @input="onSearchThink"
      />
    </form>
    <!-- /搜索栏 -->
       <!-- 搜索结果 -->
    <search-result v-if="showResult" />

    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent" >
        <!-- //遍历数组 -->
      <van-cell
       icon="search"
       :title="item"
       v-for="(item,index) in suggestion"
       :key="index"
        />

    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group  v-else>
    <van-cell title="历史记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>

      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->

  </div>

</template>

<script>
import searchResult from './components/search-result'
import { getSuggestion } from '@/api/search' // 搜索联想建议
export default {
  name: 'SearchPage',
  components: {
    searchResult// list组件
  },
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      showResult: false, // 搜索结果展示
      suggestion: [] // 搜索联想建议空数组

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('onSearch')
      this.showResult = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 联想搜索显示
    async onSearchThink () {
      // 1.先判断为空不;
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      // 2.调用接口;
      const { data } = await getSuggestion(searchContent)
      // 3.绑定数据;
      this.suggestion = data.data.options
      console.log(data)
    }

  }

}
</script>

<style lang="less" scoped>
.search-container {
//   padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}

</style>
