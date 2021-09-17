<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title-text"
           slot="title">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  @click="isEdit = !isEdit"
                  size="small">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel,index) in myChannels"
                     :key="channel.id"
                     @click="onMyChannelClick(channel,index)">
        <van-icon v-show="isEdit && channel.id !== 0"
                  slot="icon"
                  name="clear"></van-icon>
        <span class="text"
              :class="{active: myActive === index}"
              slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div class="title-text"
           slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="channel in recommendChannels"
                     :key="channel.id"
                     icon="plus"
                     @click="onAddChannel(channel)"
                     :text="channel.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    myActive: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      // 所有频道列表
      allChannels: [],
      // 编辑状态
      isEdit: false
    }
  },
  created () {
    this.loadAllChannel()
  },
  methods: {
    // 获取全部频道列表数据
    async loadAllChannel () {
      try {
        const { data: res } = await getAllChannel()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast.fail('频道列表数据获取失败')
      }
    },
    // 添加推荐频道到我的频道并把数据保存到服务器或本地
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      console.log(channel)
      // 判断是否登录状态
      if (this.user) {
        // 已登录,把数据请求接口放到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          console.log(err)
          this.$toast.fail('添加数据频道失败')
        }
      } else {
        // 未登录, 把数据储存到本地
        console.log(1)
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 编辑我的频道,并把数据保存到服务器或本地
    onMyChannelClick (channel, index) {
      // isEdit = true 编辑状态
      if (this.isEdit) {
        // 编辑状态, 执行删除频道
        // 如果是固定频道不删除
        if (channel.id !== 0) {
          this.myChannels.splice(index, 1)
          if (index <= this.myActive) {
            // 如果删除的是激活频道之前的频道, 需要this.myActive - 1
            this.$emit('updateActive', this.myActive - 1, true)
          }
          //
          this.deleteChannel(channel.id)
        }
      } else {
        // 非编辑状态,执行切换频道
        this.$emit('updateActive', index, false)
      }
    },
    async deleteChannel (id) {
      // 已登录 把数据保存到服务器
      if (this.user) {
        try {
          deleteUserChannel(id)
        } catch (err) {
          this.$toast.fail('删除频道数据失败')
          console.log(err)
        }
      } else {
        // 未登录 把数据保存到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    // 用户信息
    ...mapState(['user']),
    // 获取推荐频道
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
      // 第二种方法
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   const ret = this.myChannels.find(myChannel => {
      //     return channel.id === myChannel.id
      //   })
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 45px 0;
  .title-text {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .my-grid {
    .grid-item {
      width: 80px;
      height: 43px;
      /deep/ .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text,
        .text {
          margin-top: 0;
          font-size: 14px;
          color: #222;
        }
        .active {
          color: red;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }
      /deep/.van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  .recommend-grid {
    .grid-item {
      /deep/ .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 14px;
        }
        .van-grid-item__text {
          margin-top: 0;
          margin-left: 3px;
          font-size: 14px;
          color: #222;
        }
      }
    }
  }
}
</style>
