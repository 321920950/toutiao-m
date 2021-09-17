<template>
  <div class="search-container">
    <!-- 搜索 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form class="search-form"
          action="/">
      <van-search v-model="searchInfo"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow = false" />
    </form>
    <!-- /搜索 -->
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow"
                  :searchInfo="searchInfo"></SearchResult>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchInfo"
                      :searchInfo="searchInfo"
                      @search="onSearch"></SearchSuggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else
                   :searchHistories="searchHistories"
                   @search="onSearch"
                   @deleteSearch="deletesearchHistories"
                   @arrDeleteSearch="arrDeletesearchHistories"></SearchHistory>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { setItem, getItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
import { getSearchHistory, deleteSearchHistory } from '@/api/search.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  created () {
    // 读取搜索历史记录
    this.loadsearchHistories()
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      searchInfo: '',
      // 搜索结果显示框
      isResultShow: false,
      // 搜索历史
      searchHistories: []
    }
  },
  methods: {
    onSearch (text) {
      this.searchInfo = text
      this.isResultShow = true
      // 删除搜索记录的重复项
      const index = this.searchHistories.indexOf(text)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 把最新搜索存储到最上方
      this.searchHistories.unshift(text)

      // 已登录 后端会把搜索记录存储到线上
      // 未登录 数据保存到本地
      if (!this.user) {
        setItem('search-histories', this.searchHistories)
      }
    },
    onCancel () { this.$router.back() },
    // 获取搜索历史记录数据
    async loadsearchHistories () {
      if (this.user) {
        // 因为后端返回历史记录太少 所以合并了本地的
        const { data: res } = await getSearchHistory()
        this.searchHistories = [...new Set([...res.data.keywords, ...getItem('search-histories')])]
      } else {
        this.searchHistories = getItem('search-histories') || []
      }
    },
    // 删除某个历史记录
    async deletesearchHistories (index) {
      this.searchHistories.splice(index, 1)
      if (this.user) {
        try {
          // 接口问题 变成全部删除
          await deleteSearchHistory()
        } catch (err) {
          console.log(err)
        }
      } else {
        setItem('search-histories', this.searchHistories)
      }
    },
    // 删除全部历史记录
    async arrDeletesearchHistories () {
      this.searchHistories = []
      if (this.user) {
        try {
          // 全部删除
          await deleteSearchHistory()
          setItem('search-histories', this.searchHistories)
        } catch (err) {
          console.log(err)
        }
      } else {
        setItem('search-histories', this.searchHistories)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
