<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="小智同学"
                 left-arrow
                 @click-left="$router.back()"></van-nav-bar>
    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <van-cell>1</van-cell>
      <van-cell>2</van-cell>
      <van-cell>3</van-cell>
      <van-cell>4</van-cell>
      <van-cell>5</van-cell>
      <van-cell>1</van-cell>
      <van-cell>2</van-cell>
      <van-cell>3</van-cell>
      <van-cell>4</van-cell>
      <van-cell>5</van-cell>
      <van-cell>1</van-cell>
      <van-cell>2</van-cell>
      <van-cell>3</van-cell>
      <van-cell>4</van-cell>
      <van-cell>5</van-cell>
      <van-cell>1</van-cell>
      <van-cell>2</van-cell>
      <van-cell>3</van-cell>
      <van-cell>4</van-cell>
      <van-cell>5</van-cell>
      <van-cell>5</van-cell>
    </van-cell-group>
    <!-- 发送信息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message"
                 placeholder="请输入要发送的消息">

      </van-field>
      <van-button type="primary">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null
    }
  },
  mounted () {
    // 建立连接
    //   this.socket = io('http://ttapi.research.itcast.cn')
    //   this.socket.on('connect', function () {
    //     console.log('连接成功')
    //   })
    //   this.socket.on('disconnect', function () {
    //     console.log('连接断开')
    //   })
    //   // 接收消息
    //   this.socket.on('message', function () {
    //     console.log('连接断开')
    //   })
    // },
    // methods: {
    //   onSend () {
    //     this.socket.emit('message', {
    //       msg: this.message,
    //       timestapmp: Date.now()
    //     })
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 45px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message {
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: center;
  .van-button {
    width: 70px;
  }
}
</style>
