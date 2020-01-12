<template>
    <div class="user-container">
        <!-- //导航 -->
        <van-nav-bar :title="user.name" left-arrow/>
        <!-- 头部组件 -->
        <div class="userInfo">
            <van-image
            class="img"
                round
                :src="user.photo"
            />
            <div class="right">
                <div class="vans">
                     <div class="vans-cont">
                        <span>{{user.art_count}}</span>
                        <span>头条</span>
                        </div>
                     <div class="vans-cont">
                        <span>{{user.follow_count}}</span>
                        <span>关注</span>
                        </div>
                     <div class="vans-cont">
                        <span>{{user.fans_count}}</span>
                        <span>粉丝</span>
                        </div>
                     <div class="vans-cont">
                        <span>{{user.like_count}}</span>
                        <span>获赞</span>
                    </div>
                </div>
                <div class="msg">
                    <van-button type="primary" size="small">私信</van-button>
                    <van-button type="info" icon="plus" size="small">

                        关注</van-button>
                </div>
            </div>

        </div>
        <!-- //简介 -->
        <div class="introduc">
            <span>简介:</span>
            <span>{{user.intro}}</span>
        </div>

    </div>
</template>

<script>
import { getUserInfoById } from '@/api/user' // 引入api接口
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    // 获取指定用户信息;传id
    async getUserById () {
      try {
        const { data } = await getUserInfoById(this.$route.params.id)
        this.user = data.data
        console.log(data)
      } catch (error) {
        console.log('获取失败')
        this.$toast('获取用户数据失败')
      }
    }
  },
  created () {
    this.getUserById()
  }

}
</script>

<style lang="less" scoped>
.user-container{
    .userInfo{
        background: #fff;
        padding: 10px 20px 10px 20px;
        display: flex;
        .img{
            width: 70px;
            height: 70px;
            flex: 20%;
        }
        .right{
            flex: 80%;
            .vans{
                font-size: 14px;
                display: flex;

                .vans-cont{
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    text-align: center;

                }
            }
            .msg{
                display: flex;
                padding:0 20px 0 20px;
                justify-content: space-between;
            }
        }
    }
    .introduc{
        font-size: 14px;
        padding: 20px;
        background:#fff;
    }
}

</style>
