<template>
  <div id="app">
    <keep-alive :include="['TabBar']">
      <router-view></router-view>

    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>

//  @import '~@/styles/variables.less';
 @import url('~@/styles/variables.less');
p{
  color: @color-primse;
};
.icon{
  font-size: 50px;
}

</style>
