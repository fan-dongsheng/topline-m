<template>
  <div class="comment-replay">
      <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"

        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <comment-item  :comment='comment'/>
    <van-cell title="所有回复" />

    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
   <comment-item
   v-for="(item,index) in list"
   :key="index"
   :comment='item'>

      </comment-item>
    </van-list>
     <!-- /底部区域 -->
        <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="showPopup=true"
      >写评论</van-button>

      <!-- //收藏判断一下,data中的is_collected是否为false -->

      <van-icon
        color="#e5645f"
        name='good-job'

      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
        <!-- 发表评论弹层 -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '20%' }"
    >
    <!-- v-model 绑定到组件 相当于
            :value='message'
            @input=message -->
      <post-comment v-model="message"  @click-post='onPost'/>
    </van-popup>

  </div>
</template>

<script>
import commentItem from './comment-item'
import { getComments, addComments } from '@/api/comment'
import postComment from './post-comment' // 发表评论的弹层组件
export default {
  components: {
    commentItem,
    postComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      showPopup: false, // 发布评论弹层
      message: ''

    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.comment.com_id.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

      })
      console.log(data, '回复')
      const { results } = data.data
      this.list.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    // 发表回复评论
    async onPost () {
      const { data } = await addComments(
        {
          target: this.comment.com_id.toString(),
          content: this.message,
          art_id: this.articleId

        }

      )

      this.list.unshift(data.data.new_obj)
      this.message = '' // 清空
      this.showPopup = false
    }

  }

}
</script>

<style lang="less" scoped>
.van-icon{
    color: white;
}
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }

</style>
