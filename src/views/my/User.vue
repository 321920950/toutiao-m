<template>
  <div class="my-container">
    <!-- 登录状态展示 -->
    <van-cell-group class="my-info"
                    v-if="user">
      <van-cell class="base-info"
                title="单元格"
                center
                :border="false"
                value="内容">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   :src="LoginUserInfo.photo" />
        <div class="name"
             slot="title">{{LoginUserInfo.name}}</div>
        <van-button class="updata-btn"
                    size="small"
                    to="/userdata"
                    round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info"
                :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-warp"
               slot="text">
            <div class="span">{{LoginUserInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp"
               slot="text">
            <div class="span">{{LoginUserInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp"
               slot="text">
            <div class="span">{{LoginUserInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp"
               slot="text">
            <div class="span">{{LoginUserInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录展示 -->
    <div class="not-login"
         v-else>
      <img class="mobile"
           @click="$router.push({
             name:'login',
             query: {
               redirect: '/my'
             }
           })"
           src="./shouji.png">
      <div class="text"
           @click="$router.push({
             name:'login',
             query: {
               redirect: '/my'
             }
           })">登录 / 注册</div>
    </div>
    <!-- 历史与收藏 -->
    <van-grid class="nav-grid"
              :column-num="2">
      <van-grid-item class="nav-grid-item"
                     text="收藏">
        <van-icon class="iconfont icon-shoucang"
                  slot="icon"></van-icon>
      </van-grid-item>
      <van-grid-item class="nav-grid-item"
                     text="历史">
        <van-icon class="iconfont icon-lishi"
                  slot="icon"></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知"
              is-link
              url="/vant/mobile.html" />
    <van-cell title="小智同学"
              is-link
              to="/userchat" />
    <van-cell class="logout-cell"
              v-if="user"
              @click="logoutLogin "
              title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getLoginUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      LoginUserInfo: {}
    }
  },
  created () {
    this.loadLoginUserInfo()
  },
  methods: {
    // 退出登录
    logoutLogin () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '您确认退出吗?退出将无法收藏与评论等功能'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取登录用户信息
    async loadLoginUserInfo () {
      try {
        const { data: res } = await getLoginUserInfo()
        this.LoginUserInfo = res.data
        console.log(this.LoginUserInfo)
      } catch (err) {
        this.$toast.fail('获取用户信息失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    // background: url('/src/assets/image/banner.png') no-repeat;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .updata-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-warp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .span {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }
  .nav-grid {
    margin-bottom: 5px;
    .nav-grid-item {
      height: 71px;
      padding-top: 10px;
      font-size: 25px;
      color: #333333;
      .iconfont {
        font-size: 30px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
    }
    .nav-grid-item:nth-child(1) {
      border-right: 1px solid #d3b39f;
    }
  }
  .logout-cell {
    height: 52px;
    margin-top: 5px;
    font-size: 15px;
    font-weight: 400;
    color: #d86262;
    text-align: center;
  }
  .not-login {
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      margin-top: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
}
</style>
