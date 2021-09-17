<template>
  <van-icon :class="article.is_collected ? 'cffa550' :'c777'"
            :name="article.is_collected ? 'star' :'star-o'"
            @click="onCollec" />
</template>

<script>
import { mapState } from 'vuex'
import { deleteCollec, addCollec } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['article'])
  },
  methods: {
    // 收藏文章与取消收藏
    async onCollec () {
      console.log(this.article)
      try {
        if (this.article.is_collected) {
          // 已收藏 点击则取消收藏
          deleteCollec(this.article.art_id)
          this.$toast('已取消收藏')
        } else {
          // 未收藏 点击则收藏
          addCollec(this.article.art_id)
          this.$toast('收藏成功')
        }
      } catch (err) {
        const message = '操作失败,请检查网络'
        console.log(err)
        this.$toast.fail(message)
      }
      this.article.is_collected = !this.article.is_collected
    }
  }
}
</script>

<style scoped>
.van-icon {
  font-size: 25px;
}
</style>
