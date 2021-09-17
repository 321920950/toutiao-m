<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(item,index) in list"
                :to="`/article/${item.art_id}`"
                :key="index"
                :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultList } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchInfo: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      parPage: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getSearchResultList({
          page: this.page,
          per_page: this.parPage,
          q: this.searchInfo
        })
        this.page++
        this.list.push(...res.data.results)
        console.log(res)
        // 加载状态结束
        this.loading = false
      } catch (err) {
        this.$toast.fail('搜索失败')
        console.log(err)
      }
      // 数据全部加载完成
      if (this.list.length >= this.per_page) {
        this.finished = true
      }
    }
    // 根据文章id跳转到文章详情
    // goComment (id) {
    //   this.$router.push('/article/' + id)
    // }
  }
}

</script>

<style>
</style>
