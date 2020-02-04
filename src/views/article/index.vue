<template>
  <div class="article-container">
      <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
    v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <!-- 判断article中有没有数据,有就显示,没有就else,随便写一个article.title -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | time}}</p>
          </div>
        </div>
        <van-button  class="follow-btn"
          v-if="!$store.state.user || article.aut_id!==$store.state.user.id"
         :type="article.is_followed?'default':'info'"
         size="small"
         @click="onFollow"
         round>{{article.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content">

      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticleById"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 文章评论组件 -->
    <div class="comments">
      <!-- 传id给子组件使用 -->
      <article-comments
      @replay-comment="replayComment"
       :articleId='articleId'  ref="article-comments"/>
      <!-- ref可以直接拿到组件 -->
    </div>

    <!-- 底部区域 -->
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
    <!-- 回复评论弹层 -->
    <van-popup
    v-model="replayShow"
    position="bottom"
    :style="{ height: '90%' }"

  >
  <comment-replay
  :articleId='articleId'
   :comment='currentComment' @click-close='replayShow=false'/>
  </van-popup>
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="showPopup=true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />

      <!-- //收藏判断一下,data中的is_collected是否为false -->
      <van-icon
        color="orange"
        :name="article.is_collected? 'star' :'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude===1?'good-job':'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById, getCollect, deleteCollect, like, dislike } from '@/api/article'
import { addFollow, delFollow } from '@/api/user'
import '@/utils/datetime'
import articleComments from './components/article-comments' // 评论列表组件
import postComment from './components/post-comment' // 发表评论的弹层组件
import { addComments } from '@/api/comment' // 评论发布接口
import commentReplay from './components/comment-replay'

export default {
  name: 'ArticlePage',
  components: {
    articleComments,
    postComment,
    commentReplay
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 默认加载
      showPopup: false, // 弹层
      message: '', // 评论的内容
      replayShow: false, // 回复弹层
      currentComment: {} // 传过来的值
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleById()
  },
  mounted () {},
  methods: {
    // 按id获取文章详情;
    async loadArticleById () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        console.log(data, '文章')
      } catch (error) {
        console.log(error, '文章详情失败')
      }
      this.loading = false
    },
    // 文章收藏
    async onCollect () {
      this.$toast.loading({
        message: '收藏中...',
        duration: 0, // 持续展示;
        forbidClick: true // 是否禁止背景点击(继续多次点击)
      })
      // 判断如果收藏了就取消, 在后端接口data中有 is_collected:false  代表没收藏
      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏成功')
        } else {
          await getCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        console.log('收藏操作失败', error)
      }
    },
    // 文章点赞
    async onLike () {
      this.$toast.loading({
        message: '点赞操作中...',
        duration: 0, // 持续展示;
        forbidClick: true // 是否禁止背景点击(继续多次点击)
      })
      // 判断如果点击了就取消, 在后端接口data中有 attitude:false  代表没收藏
      try {
        if (this.article.attitude === 1) {
          await dislike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞成功')
        } else {
          await like(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log('点赞操作失败', error)
      }
    },
    // 关注用户
    async onFollow () {
      // this.$toast.loading({
      //   message: '关注操作中...',
      //   duration: 0, // 持续展示;
      //   forbidClick: true // 是否禁止背景点击(继续多次点击)
      // })
      // 判断如果点击了就取消, 在后端接口data中有 attitude:false  代表没收藏
      try {
        if (this.article.is_followed) {
          await delFollow(this.article.aut_id)

          this.$toast.success('取消关注成功')
        } else {
          await addFollow(this.article.aut_id)

          this.$toast.success('关注成功')
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        console.log('关注操作失败', error)
      }
    },
    // 发表评论
    async onPost () {
      const { data } = await addComments({
        target: this.articleId,
        content: this.message
      })
      console.log(data)
      this.message = '' // 清空
      this.showPopup = false
      // 用ref拿到组件,将它的new_obj数组加到list,然后放在最前面;
      this.$refs['article-comments'].list.unshift(data.data.new_obj)
    },
    // 回复评论
    replayComment (comment) {
      this.currentComment = comment
      this.replayShow = true
    }
  }
}
</script>

<style lang="less" scoped>
@import "./article.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
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
}

</style>
