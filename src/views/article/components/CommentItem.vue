<template>
  <van-cell class="comment-item">
    <van-image slot="icon"
               class="avatar"
               round
               fit="cover"
               :src="comment.aut_photo" />
    <div slot="title"
         class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button class="like-btn"
                  @click="onCommnetLike"
                  :loading="commentLoading"
                  :icon="comment.is_liking? 'good-job': 'good-job-o'"
                  :class="comment.is_liking ? 'cffa550' :'c777'">{{comment.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button class="reply-btn"
                    round>回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommnetLike, deleteCommnetLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      // 点赞加载状态
      commentLoading: false
    }
  },
  computed: {

  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onCommnetLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          //  已点赞 取消点赞
          deleteCommnetLike(this.comment.com_id)
          this.comment.like_count--
          this.$toast('点赞成功')
        } else {
          // 未点赞 点赞
          addCommnetLike(this.comment.com_id)
          this.comment.like_count++
          this.$toast('取消点赞')
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast.fail('操作失败,请检查网络')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 10px;
    color: #222;
    margin-right: 12px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 68px;
    height: 24px;
    line-height: 24px;
    font-size: 11px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 10px;
    line-height: 15px;
    margin-right: 3px;
    .van-icon {
      font-size: 15px;
    }
  }
}
</style>
