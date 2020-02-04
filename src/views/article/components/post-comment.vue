<template>
  <div class="post">
      <!-- $event相当于当前组件返回的参数值value,
        oninput(value){
        }
       -->
      <van-field
  :value="value"
  @input="$emit('input',$event)"

  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
/>
<!-- 组件通信,点击发布传给父组件click-post -->
<van-button type="default" @click="$emit('click-post')">发布</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }

}
</script>

<style lang="less" scoped>
.post{
    display: flex;
    align-items: center;
    .van-field{
        flex:60%;
    }

}

</style>
