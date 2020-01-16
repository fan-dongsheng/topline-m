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
    <search-result v-if="showResult"
        :q="searchContent"
     />

    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent" >
        <!-- //遍历数组 -->
      <van-cell
       icon="search"
        @click="onSearch(item)"
       v-for="(item,index) in suggestion"
       :key="index"
        >
        <!-- //高亮显示 -->
        <div slot="title" v-html="highLight(item)" >
            {{item}}
        </div>

        </van-cell>

    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group  v-else>
    <van-cell title="历史记录">
      <van-icon name="delete"

      @click="isShowIcon=!isShowIcon"
       v-if="isShowIcon"/>

      <template  v-else>
      <span @click="searchHistory=[]">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isShowIcon=!isShowIcon">完成</span>
      </template>
    </van-cell>

      <van-cell
      :title="item"
      v-for="(item,index) in searchHistory"
      :key="index"
      @click="onSearchHistory(item,index)"

      >
        <van-icon name="close" v-if="!isShowIcon"></van-icon>
      </van-cell>

    </van-cell-group>
    <!-- /历史记录 -->

  </div>

</template>

<script>
import searchResult from './components/search-result'
import { getSuggestion } from '@/api/search' // 搜索联想建议
import { debounce } from 'lodash' // 函数防抖处理
import { setItem, getItem } from '@/utils/storage' // 数据持久化保存;
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
      suggestion: [], // 搜索联想建议空数组
      searchHistory: getItem('searchHistory') || [], // 搜索历史,获取本地持久化数据,没有就空数组
      isShowIcon: true // 搜索删除按钮

    }
  },
  computed: {},
  watch: {
    // 监听历史记录变化,持久化保存搜索历史数据
    // 有两个参数,第一个是新数据,第二个是旧数据
    searchHistory (newVal) {
      setItem('searchHistory', newVal)
    }
  },
  created () {},
  mounted () {},
  methods: {
    // search 确定搜索时触发,回调参数就是当前输入框的值value
    onSearch (q) {
      // 点击搜索的联想 传值过来,可以改变搜索框的值和掉接口的值
      this.searchContent = q

      // 搜索历史功能添加展示;
      const index = this.searchHistory.indexOf(q)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(q)
      // 展示搜索结果
      console.log('onSearch')
      this.showResult = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 联想搜索显示
    // 防抖处理 debounce
    onSearchThink: debounce(async function () {
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
    }, 300),

    // 联想高亮显示;
    highLight (item) {
      // 1.定义变量=搜索内容
      const searchContent = this.searchContent
      // 2.replcae 方法替换数字
      // "Hello World".replace('Hello', '<span style="color: red">Hello</span>')
      // 需要注意的是，replace 方法的字符串匹配只能替换第1个满足的字符
      // 3.如果全局替换使用正则表达式
      // 如果想要全文替换，使用正则表达式
      // g 全局
      // i 忽略大小写
      const reg = new RegExp(searchContent, 'gi') // new一个正则

      return item.replace(reg, `<span style="color:red;">${searchContent}</span>`)
    },
    // 删除历史记录;
    onSearchHistory (item, index) {
      // 判断如果是true就删除,不是就搜索
      if (!this.isShowIcon) {
        this.searchHistory.splice(index, 1) // 数组删除
      } else {
        this.onSearch(item)
      }
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
