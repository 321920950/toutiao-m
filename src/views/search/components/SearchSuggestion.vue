<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index) in searchSuggestionList"
              :key="index"
              @click="$emit('search',text)"
              icon="search">
      <div slot="title"
           v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionList } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchInfo: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      searchSuggestionList: []
    }
  },
  watch: {
    searchInfo: {
      handler: debounce(function () {
        this.loadSearchSuggestionList()
      }, 200),
      // 因为searchInfo有内容 这个组件才触发 没有监视到searchInfo第一次的变化 所有加上加载组件就触发一次
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestionList () {
      try {
        const { data: res } = await getSearchSuggestionList(this.searchInfo)
        this.searchSuggestionList = res.data.options
      } catch (err) {
        this.$toast.fail('加载失败')
      }
    },
    // 搜索高亮
    highlight (text) {
      const highlightStr = `<sapn class="active" >${this.searchInfo}</sapn>`
      // 正则表达式 //中间的内容都会当成匹配字符串来处理,不会识别成变量
      // 如果需要根据数据动态来创建正则表达式,则手动new RegExp
      const reg = new RegExp(this.searchInfo, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>
