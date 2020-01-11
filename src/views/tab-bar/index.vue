<template>
  <div class="tabbar">
      <router-view></router-view>
        <van-tabbar v-model="active" >
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/question">问答</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/my">{{$store.state.user?'登录':'未登录'}}</van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style>

</style>
