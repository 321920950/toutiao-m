<template>
  <van-list class="comment-list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多评论了"
            :error="error"
            error-text="加载失败,请点击重试"
            @load="onLoadComment">
    <CommentItem v-for="(item,index) in commentList"
                 :key="index"
                 :comment="item"></CommentItem>
  </van-list>
</template>

<script>
import { mapState } from 'vuex'
import { getComment } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 评论列表
      // commentList: [],
      loading: false,
      finished: false,
      // 获取下一页数据的标记
      offset: null,
      // 默认获取10条评论
      limit: 10,
      error: false
    }
  },
  created () {
    this.onLoadComment()
  },
  computed: {
    ...mapState(['article'])
  },
  methods: {
    // 获取评论列表数据
    async onLoadComment () {
      // console.log(this.article)
      // console.log(Number(this.article.art_id.toString()))
      // 异步更新数据
      try {
        const { data: res } = await getComment({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.article.art_id.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        this.commentList.push(...res.data.results)
        // 把文章评论总数量传到外部
        this.$emit('totalCount', res.data.total_count)
        // console.log(res)
        // 加载状态结束
        this.loading = false
        // 判断是否还有数据
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast.fail('获取评论列表失败')
      }
    }
  }
}

</script>

<style>
</style>
