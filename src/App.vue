<template>
  <div id="app">
    <router-view></router-view>

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
