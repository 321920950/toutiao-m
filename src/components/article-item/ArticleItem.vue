<template>
  <!-- :to="`/article/` + article.art_id" -->
  <van-cell class="article-item"
            :to="{
              name: 'article',
              params: {
                 articleId: article.art_id
              }}">
    <div slot="title"
         class="title van-multi-ellipsis--l3">{{article.title}}</div>
    <div slot="label">
      <div class="label-warp"
           v-if="article.cover.type > 1">
        <div class="label-warp-item"
             v-for="(img,index) in article.cover.images"
             :key="index">
          <van-image class="cover-itme"
                     :src="img"
                     fit="cover"></van-image>
        </div>
      </div>
      <div class="label-info-item">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image class="right-cover"
               v-if="article.cover.type === 1"
               slot="default"
               fit="cover"
               :src="article.cover.images[0]" />
  </van-cell>

</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-right: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }

  .label-warp {
    padding: 10px 0;
    display: flex;
    .label-warp-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-itme {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-info-item span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }
}
</style>
