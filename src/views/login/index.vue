<template>
  <div class="login">
    <!-- 头部 -->
        <van-nav-bar title="标题"/>
    <!-- 输入框 -->
    <!-- <ValidationProvider>校验组件 -->
    <ValidationObserver ref="form">
          <!-- 注意required|mobile 管道前后不许加空格 -->
          <ValidationProvider name="手机号" rules="required|mobile" v-slot="{ errors }" immediate>
                <van-field
                v-model="user.mobile"

                placeholder="请输入手机号"

            >

            <i slot="left-icon" class="icon icon-phone_icon"></i>

            </van-field>
            <!-- //错误消息获取,提示 -->
            <!-- <span>{{ errors[0] }}</span> -->
            </ValidationProvider>

            <ValidationProvider name="验证码" rules="required|code" immediate>

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
              </ValidationProvider>

               </ValidationObserver>

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
      // 1. 获取表单数据;
      const user = this.user
      // 2.表单验证
      const success = await this.$refs.form.validate() // 手动校验
      if (!success) {
        // 表单验证失败处理
        console.log('验证失败')
        const errors = this.$refs.form.errors // 通过this.$resfs指向组件实例,组建中有errors变量,可以调用
        // errors中的数据,需要失去焦点才能有数据,所以要在组建中加一个属性 immediate 立即获取
        // errors是一个对象,值是数组,for in 遍历对象,key是键, errors[key]是值,
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0]) // 找到第1个有错误的消息，给出提示，停止遍历
            return
          }
        }
      }
      // 表单验证通过处理
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
        this.$toast('登录失败', '手机号或验证码错误')
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
