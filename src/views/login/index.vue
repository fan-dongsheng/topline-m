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
              <van-button class="code" slot="button"  size="small" round type="info">发送验证码</van-button>

              </van-field>
               </van-cell-group>

        <!-- 登录按钮 -->
        <div class="login-button">
           <van-button type="info">登录</van-button>
        </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
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
