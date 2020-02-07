<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
        <!-- //reverse是为了区分自己还是服务器 写的类名
        :class={类名:布尔值}-->
      <div
        class="message-item"
        :class="{ reverse:item.isMe }"
        v-for="(item,index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small"
        @click="send"
        type="primary">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      message: '',
      socket: null, // 为了方便调用
      messages: [] // 页面显示数据
    }
  },
  created () {
    // 建立连接,webscoket
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', function () {
      console.log('建立连接成功')
    })

    // 监听传回来的信息,接口要求事件名必须为message
    socket.on('message', message => {
    //   console.log('message', message)
    // 将数据添加到数组中
      this.messages.push(message)
    })
  },
  methods: {
    // 发送消息
    send () {
      // scoket 获取从data中
      const message = this.message
      if (!message.length) {
        return
      }
      // 为了区分是发送的还是接受的,需要添加一个isMe=true,这样就可以左右显示
      const data = {
        msg: this.message,
        timestamp: new Date(),
        isMe: true
      }
      this.socket.emit('message', data)
      // 将data对象,添加到数组messages中,通过遍历显示到页面,发送和接收的数据放到一个数组
      this.messages.push(data)

      this.message = ''
    }
  }

}
</script>

<style scoped lang="less">
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }

    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
