<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 子路由出口 -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active"
                route
                @change="onChange">
      <van-tabbar-item icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o"
                       to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o"
                       to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o"
                       to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: ''
    }
  },
  mounted () {
    this.$store.commit('addCachePages', 'LayoutIndex')
  },
  methods: {
    // 切换标签时触发
    onChange () { }
  }
}
</script>

<style scoped lang="less">
/deep/.van-tabbar--fixed {
  position: fixed !important;
}
</style>
