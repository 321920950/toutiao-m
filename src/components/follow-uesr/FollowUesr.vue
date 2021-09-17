<template>
  <van-button @click="onFollw(userId)"
              v-if="is_followed"
              round
              :loading="followedLoading"
              size="small">已关注</van-button>
  <van-button @click="onFollw(userId)"
              v-else
              type="info"
              color="#3296fa"
              round
              :loading="followedLoading"
              size="small"
              icon="plus">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUesr',
  model: {
    prop: 'is_followed',
    event: 'updata-followed'
  },
  props: {
    is_followed: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [String, Number, Object],
      require: true
    }
  },
  data () {
    return {
      // 关注加载按钮
      followedLoading: false
    }
  },
  methods: {
    // 关注与取消关注
    async onFollw () {
      this.followedLoading = true
      try {
        if (this.is_followed) {
          // 已关注 点击则取消关注

          deleteFollow(this.userId)
          this.$toast('已取消关注')
        } else {
          // 未关注 点击则关注
          addFollow(this.userId)
          this.$toast('关注成功')
        }
        // this.is_followed = !this.is_followed
        this.$emit('updata-followed', !this.is_followed)
      } catch (err) {
        let message = '操作失败,请检查网络'
        if (err.response && err.response.status === 400) {
          message = '关注失败不能关注自己'
        }
        this.$toast.fail(message)
      }
      this.followedLoading = false
    }
  }
}
</script>

<style>
</style>
