<template>

  <div class="home-container">
    <!-- 搜索 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  type="info"
                  round
                  size="small"
                  to="/search"
                  icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs"
              v-model="tabActive"
              border>
      <van-tab :title="Channel.name"
               v-for="(Channel,index) in userChannels"
               :key="index">
        <!-- 文章列表 -->
        <ArticleList :channelId="Channel.id"></ArticleList>
      </van-tab>
      <div class="placeholder"
           slot="nav-right"></div>
      <div class="hamburger-btn"
           slot="nav-right"
           @click="isChannelEditShow = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑频道弹出层 -->
    <van-popup v-model="isChannelEditShow"
               closeable
               close-icon-position="top-left"
               position="top"
               :style="{ height: '100%' }">
      <ChannelEdit :myChannels="userChannels"
                   :myActive="tabActive"
                   @updateActive="updateActive"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      // 默认显示的频道
      tabActive: 0,
      // 当前用户频道信息
      userChannels: [],
      // 弹出层状态
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 加载频道列表
    async loadChannels () {
      // 已登录
      if (this.user) {
        try {
          const { data: res } = await getUserChannels()
          this.userChannels = res.data.channels
        } catch (err) {
          this.$toast.fail('获取频道信息失败')
        }
      } else {
        // 未登录 获取本地数据,没有则请求默认频道数据
        const localChannel = getItem('TOUTIAO_CHANNELS')
        if (localChannel) {
          this.userChannels = localChannel
        } else {
          try {
            const { data: res } = await getUserChannels()
            this.userChannels = res.data.channels
          } catch (err) {
            this.$toast.fail('获取频道信息失败')
          }
        }
      }
    },
    // 通过子组件修改tabActive
    updateActive (index, isChannelEditShow = true) {
      this.tabActive = index
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .channel-tabs {
    /deep/ .van-tab {
      min-width: 100px;
      height: 41px;
      border-right: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 33px;
      height: 41px;
    }
    .hamburger-btn {
      position: fixed;
      display: flex;
      right: 0;
      width: 33px;
      height: 41px;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
    }
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
