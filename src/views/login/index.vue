<template>
  <div class="login">
    <!-- 头部 -->
        <van-nav-bar title="标题"/>
    <!-- 输入框 -->
    <!-- <ValidationProvider>校验组件 -->
    <ValidationObserver ref="form">
          <!-- 注意required|mobile 管道前后不许加空格 -->
          <ValidationProvider name="手机号" rules="required|mobile"  immediate>
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
import { validate } from 'vee-validate' // 引入发送验证码 数据字段验证方法;
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
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
        forbidClick: true // 是否禁止背景点击(继续多次点击)
      })

      try {
        // 优化,用结构赋值 const { data} =await login(user)  取出data
        // const res = await login(user)
        const { data } = await login(user)
        console.log('登录成功', data)
        // 获取token;在res.data.data中有token;
        // const userToken = res.data.data
        // 优化,data是优化的 里面有data可以直接取到token
        const userToken = data.data
        this.$store.commit('getUserToken', userToken)

        this.$toast('登录成功')
        // 处理登录成功后,如果有当前页面就返回当前页面
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (error) {
        console.log('登录失败', error)
        this.$toast('登录失败', '手机号或验证码错误')
      }
    },

    // 发送验证码;
    async sendCode () {
      const { mobile } = this.user // 解构赋值方式获取mobile
      // 验证手机号
      // 第一个参数是验证的数据,第二个是规则,第三个是字段名;
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 返回值：{ valid, errors, ... }
      //  valid: 验证是否成功，成功 true，失败 false
      // errors：一个数组，错误提示消息
      console.log(validateResult.valid, validateResult.errors)

      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
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
