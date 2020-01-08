<template>
  <div class="login">
    <!-- 头部 -->
        <van-nav-bar title="标题"/>
    <!-- 输入框 -->
        <van-cell-group>

                <van-field
                v-model="user.mobile"

                placeholder="请输入手机号"

            >

            <i slot="left-icon" class="icon icon-phone_icon"></i>

            </van-field>

              <van-field
                  v-model="user.code"

                  placeholder="请输入验证码"

              >
              <i slot="left-icon" class="icon icon-suo"></i>
              <van-button
              v-if="!isShow" class="code"
              slot="button"  size="small"
              round type="info" @click="sendCode">发送验证码</van-button>
               <van-count-down
                  v-else
                  slot="button"
                  :time="1000*60"
                  format="ss 秒"
                  @finish="isShow=false"
                />
                <!-- finish是倒计时的一个时间,倒计时结束后执行事件 -->

              </van-field>

               </van-cell-group>

        <!-- 登录按钮 -->
        <div class="login-button">
           <van-button @click="onLogin" type="info">登录</van-button>
        </div>

  </div>
</template>

<script>
import { login, sendCodeSms } from '@/api/user.js' // 引用封装好的请求接口,统一引用
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 发送验证码显示隐藏;
      isShow: false
    }
  },
  methods: {

    // 登录
    async onLogin () {
      // 获取表单数据;
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        duration: 0, // 持续展示;
        forbidClick: true
      })

      try {
        const res = await login(user)

        console.log('登录成功', res)
        this.$toast('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast('登录失败')
      }
    },

    // 发送验证码;
    async sendCode () {
      const { mobile } = this.user // 解构赋值方式获取mobile
      this.isShow = true
      try {
        let res = await sendCodeSms(mobile)
        console.log('成功', res)
      } catch (error) {
        console.log('发送验证码失败', error)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.van-field{
  height: 44px;
  align-items: center;
}

.login-button{
  padding: 10px;
  margin: 20px 0;
  .van-button{
    width: 100%;

  }
}

  .code{

  .van-button__text{
    font-size: 12px;
  }

}
</style>
