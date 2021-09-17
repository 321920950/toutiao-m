<template>
  <div class="article-list"
       ref="article-list">
    <van-pull-refresh v-model="isPullDownLoading"
                      @refresh="onPullDownRefresh"
                      :success-text="refreshSuccessText"
                      :success-duration="1000">

      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="loadArticleList">
        <ArticleItem v-for="(article,index) in articleslList"
                     :key="index"
                     :article="article"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
import { getArticleList } from '@/api/article.js'
import ArticleItem from '@/components/article-item/ArticleItem.vue'
import { mapState } from 'vuex'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channelId: {
      required: true
    }
  },
  computed: {
    ...mapState(['requestState'])
  },
  data () {
    return {
      // 数据列表
      articleslList: [],
      // 控制是否显示加载中
      loading: false,
      // 控制是否全部加载完成
      finished: false,
      // 总数据
      articlePage: '',
      // 下一页数据
      pre_timestamp: null,
      // 下拉刷新状态
      isPullDownLoading: false,
      // 刷新成功提示文本
      refreshSuccessText: '',
      scrollTop: 0
    }
  },
  created () {
    this.loadArticleList()
  },
  mounted () {
    const articleList = this.$refs['article-list']
    console.log(articleList)
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  methods: {
    // 获取文章列表
    async loadArticleList () {
      if (this.requestState) {
        // console.log(this.requestState)
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        try {
          const { data: res } = await getArticleList({
            channel_id: this.channelId,
            // 先获取最新数据
            timestamp: this.pre_timestamp || Date.now(),
            with_top: 1
          })
          this.articleslList.push(...res.data.results)
          this.articlePage = res.data.page
          this.pre_timestamp = res.data.pre_timestamp
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          if (this.articleslList.length >= this.articlePage) {
            this.finished = true
          }
          // console.log(this.articleslList)
        } catch (err) {
          this.$toast.fail('获取文章列表失败')
        }
      } else {
        // console.log(this.requestState)
        this.requestState = true
      }
    },
    // 下拉刷新文章列表
    async onPullDownRefresh () {
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channelId,
          timestamp: Date.now(),
          with_top: 1
        })
        this.articleslList.unshift(...res.data.results)
        // 刷新完成
        this.isPullDownLoading = false
        this.refreshSuccessText = `更新了${res.data.results.length}数据`
        console.log(res.data)
      } catch (err) {
        this.$toast.fail('刷新文章列表失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
