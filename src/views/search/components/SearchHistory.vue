<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span @click="$emit('arrDeleteSearch')">全部删除</span>
      <van-icon @click="$emit('arrDeleteSearch')"
                name="delete"></van-icon>
    </van-cell>
    <van-cell v-for="(text,index) in searchHistories"
              :key="index"
              :title="text"
              @click="$emit('search',text)">
      <van-icon name="close"
                @click.stop="$emit('deleteSearch',index)"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
</style>
