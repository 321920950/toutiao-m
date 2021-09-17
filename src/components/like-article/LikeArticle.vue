<template>
  <van-icon :class="article.attitude === 1 ? 'cffa550' :'c777'"
            :name="article.attitude === 1 ? 'good-job' :'good-job-o'"
            @click="onLike" />
</template>

<script>
import { mapState } from 'vuex'
import { addLikeArticle, deleteLikeArticle } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['article'])
  },
  methods: {
    // 收藏文章与取消收藏
    async onLike () {
      console.log(this.article)
      try {
        if (this.article.attitude === 1) {
          // 已收藏 点击则取消收藏
          deleteLikeArticle(this.article.art_id)
          this.article.attitude = -1
          this.$toast('已取消点赞')
        } else {
          // 未收藏 点击则收藏
          addLikeArticle(this.article.art_id)
          this.article.attitude = 1
          this.$toast('点赞成功')
        }
      } catch (err) {
        const message = '操作失败,请检查网络'
        console.log(err)
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style scoped>
.van-icon {
  font-size: 25px;
}
</style>
