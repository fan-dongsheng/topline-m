<template>
  <div class="my-container">
      <!-- 未登录显示 -->
      <div class="top" v-if="!$store.state.user">

          <van-image
          @click="login"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
            width="70"
            height="70">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div class="text" @click="login">点击登录</div>

      </div>
        <!-- //登录时显示 -->
             <div class="loginShow" v-else>
                 <div class="login-user">
                     <div class="username" @click="$router.push('/user/'+user.id)">
                     <van-image :src="user.photo"
                                round
                                width="70"
                                height="70">
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>

                    </van-image>
                    <span>{{user.name}}</span>
                    </div>

                    <van-button round type="info" size="small" class="btn"
                      @click="$router.push('/user/profile')"
                    >编辑资料</van-button>
                                    </div>
                <div class="bottom">
                    <div class="bottom-cont">
                        <span>{{user.art_count}}</span>
                        <span>头条</span>
                        </div>
                     <div class="bottom-cont">
                        <span>{{user.follow_count}}</span>
                        <span>关注</span>
                        </div>
                     <div class="bottom-cont">
                        <span>{{user.fans_count}}</span>
                        <span>粉丝</span>
                        </div>
                     <div class="bottom-cont">
                        <span>{{user.like_count}}</span>
                        <span>获赞</span>
                    </div>
                </div>
            </div>

      <div class="middle">

          <van-grid :column-num="3" >
                <van-grid-item icon="star-o" text="我的收藏" to="/my-article/collect">

                </van-grid-item >

                <van-grid-item icon="browsing-history-o" text="浏览历史" to="/my-article/history" />
                <van-grid-item icon="edit" text="作品" to="/my-article">
                    <van-icon slot="icon" class-prefix="icon" name="bianji" color="#eb5253" />
                </van-grid-item >
            </van-grid>

      </div>
      <!-- //消息提示 -->
          <van-cell-group :border="false">
            <van-cell title="消息通知" is-link />
            <van-cell title="小智同学"  @click="$router.push('/user/chat')" is-link />
        </van-cell-group>
        <van-button type="default"
        style="width:100%;margin-top:10px;"
         v-if="$store.state.user"
         @click="outLogin"

         >退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  data () {
    return {
      user: {}
    }
  },

  methods: {

    login () {
      this.$router.push('/login')
    },
    // 获取用户信息个人;
    async loadInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)

        this.user = data.data
        console.log('验证成功')
      } catch (error) {
        console.log('获取用户信息失败', error)
      }
    },
    // 退出登录
    async outLogin () {
      await this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })

      // 清除登录状态
      this.$store.commit('getUserToken', null)
    }
    // outLogin () {
    //   this.$dialog.confirm({
    //     title: '退出提示',
    //     message: '确认退出吗'
    //   }).then(() => {
    //     // on confirm

    //     this.$store.commit('getUserToken', null)
    //   }).catch(() => {
    //     // on cancel
    //   })
    // }

  },
  created () {
    // 先判断有没有登录,登录之后才能获取;
    if (this.$store.state.user) {
      this.loadInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
    //未登录时显示
    .top{
        width: 100%;
        height: 200px;
        background: url('./banner.png') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;

        .text{
            font-size: 14px;
            color: #fff;
        }

    }
    //登录时显示
    .loginShow{
        width: 100%;
        height: 200px;
        background: url('./banner.png') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;

        .login-user{
            display: flex;
            font-size: 16px;
            align-items: center;
            justify-content: space-between;
            padding: 40px 20px 20px 20px ;
            .username{
                display: flex;
                justify-content: center;
                color: #fff;
                line-height: 70px;
            }
            .btn{
                background: #fff;
                color: #000;
            }
        }
        .bottom{
            font-size: 16px;
            color: #fff;
            display: flex;
            .bottom-cont{
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: column;
            }

        }
      }
      //消息;
      .van-cell-group{
          margin-top: 20px;
      }

        }

</style>
