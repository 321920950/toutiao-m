<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 @click-left="onClickLeft"
                 title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="loading">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src="article.aut_photo" />
          <div slot="title"
               class="user-name">{{article.aut_name}}</div>
          <div slot="label"
               class="publish-date">{{article.pubdate | relativeTime }}</div>
          <!-- 关注与未关注 -->
          <!-- <FollowUesr class="follow-btn"
                      :article="article"
                      @updata-followed="article.is_followed = !article.is_followed"></FollowUesr> -->
          <FollowUesr class="follow-btn"
                      :userId="article.aut_id"
                      v-model="article.is_followed"></FollowUesr>
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div class="article-content markdown-body"
             ref="article-content"
             v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论 -->
        <CommentList @totalCount="totalCommentCuout = $event"
                     :commentList="commentList"></CommentList>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      @click="isPostShow = true"
                      size="small">写评论</van-button>
          <van-icon name="comment-o"
                    :badge="totalCommentCuout"
                    color="#777" />
          <!-- 收藏 -->
          <CollectArticle>
            <!-- <van-icon color="#777"
            name="star-o" /> -->
          </CollectArticle>
          <!-- 点赞 -->
          <LikeArticle>
            <!-- <van-icon color="#777"
                    name="good-job-o" /> -->
          </LikeArticle>
          <!-- 转发 -->
          <van-icon name="share"
                    color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow"
                   position="bottom">
          <CommentPost :target="article.art_id"
                       @post-success="onPostSuccess" />
        </van-popup>
        <!-- :style="{ height: '30%' }" -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap"
           v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap"
           v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>

import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
import FollowUesr from '@/components/follow-uesr/FollowUesr.vue'
import CollectArticle from '@/components/collect-article/CollectArticle.vue'
import LikeArticle from '@/components/like-article/LikeArticle.vue'
import CommentList from './components/CommentList.vue'
import CommentPost from './components/CommentPost.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUesr,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // 文章详情数据
      article: {},
      // 加载状态
      loading: true,
      errStatus: 0,
      // 总评论
      totalCommentCuout: 0,
      // 评论弹出框状态
      isPostShow: false,
      commentList: []
    }
  },
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {
  },
  methods: {
    async loadArticle () {
      // this.$store.commit('setrequestState', false)
      this.loading = true
      try {
        const { data: res } = await getArticleById(this.articleId)
        this.article = res.data
        this.$store.commit('getArticle', res.data)
        this.loading = false
        // console.log(this.article)
        // 调用文章图片预览
        this.$nextTick(function () {
          this.previewImage()
        })
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.loading = false
        this.$toast.fail('文章详情获取失败')
      }
    },
    // 处理文章图片预览
    previewImage () {
      // 得到所有img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有图片img地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 给每个img注册点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 关闭评论弹出层
    onPostSuccess (data) {
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    },
    // 返回文章列表
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 41px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 18px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 13px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 13px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 140px;
      height: 40px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 40px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 25px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
