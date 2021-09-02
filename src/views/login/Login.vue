<template>
  <div class="login-container">
    <van-nav-bar title="登录"
                 left-arrow
                 @click-left="$router.back()" />
    <van-form @submit="onLogin"
              validate-first
              ref="loginFormRef"
              :show-error="false"
              :show-error-message="false"
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 left-icon="shouji"
                 :rules="fromRulse.mobile"
                 name='mobile'
                 placeholder="请输入手机号码">
        <van-icon class="iconfont icon-shouji"
                  slot="left-icon"></van-icon>
      </van-field>
      <van-field v-model="user.code"
                 clearable
                 :rules="fromRulse.code"
                 icon-prefix="icon"
                 left-icon="pinglun"
                 name='code'
                 class="top-yanzhengma"
                 placeholder="请输入验证码">
        <van-icon class="iconfont icon-yanzhengma"
                  slot="left-icon"></van-icon>
        <template #button>
          <van-count-down :time="1000*60"
                          @finish="isChontDownShow = false"
                          format="ss s"
                          v-if="isChontDownShow" />
          <van-button size="small"
                      class="send-btn"
                      round
                      @click.prevent="onSendSms"
                      :loading="isSendSmsLoadng"
                      v-else
                      type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button type="primary"
                    class="login-btn"
                    block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 验证规则
      fromRulse: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }]
      },
      message: '',
      // 倒计时状态
      isChontDownShow: false,
      // 控制验证码禁用状态
      isSendSmsLoadng: false
    }
  },
  methods: {
    // 登录表单验证失败信息
    onFailed (error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top'
      })
    },
    // 登录功能 vant设定只有表单验证成功才触发
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 发起登录请求
        const { data: res } = await login(this.user)
        this.$toast.success('登录成功')
        // 登录成功将token等数据保存在Vuex容器中
        this.$store.commit('setUser', res.data)
      } catch (err) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },

    // 验证码功能
    async onSendSms () {
      try {
        // 校验表单单个属性 只校验手机号
        await this.$refs.loginFormRef.validate('mobile')
        // 禁用验证码按钮
        this.isSendSmsLoadng = true
        await sendSms(this.user.mobile)
        // 验证失败和请求失败都不执行一下代码
        this.message = '获取验证码成功,请留意短信'
        this.isChontDownShow = true
        this.$toast.success(this.message)
      } catch (err) {
        if (err && err.response && err.response.status === 429) {
          this.message = '获取验证码频繁,请稍后再试'
        } else if (err.name === 'mobile') {
          this.message = err.message
        } else {
          this.message = '未知错误,稍后再试'
        }
        this.$toast.fail(this.message)
      }
      // 允许验证码按钮被点击
      this.isSendSmsLoadng = false
    }
  }
}
</script>

<style  lang="less">
.send-btn {
  width: 90px;
  height: 23px;
  border: none;
  background-color: #ededed;
  .van-button__text {
    font-size: 11px;
    color: #666;
  }
}
.login-btn-warp {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    border-radius: 5px;
    .van-button__text {
      font-size: 15px;
    }
  }
}
</style>
