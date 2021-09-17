<template>
  <div class="updata-name">
    <!-- 导航栏 -->
    <van-nav-bar title="修改昵称"
                 left-text="取消"
                 right-text="确定"
                 @click-right="onConfirm"
                 @click-left="cancelName">
    </van-nav-bar>

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field v-model="nameMessage"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { editUserData } from '@/api/user.js'
export default {
  name: 'UpdataName',
  data () {
    return {
      nameMessage: ''
    }
  },
  created () {
    this.nameMessage = this.userData.name
  },
  methods: {
    // 确定修改名字
    async onConfirm () {
      if (this.nameMessage.length) {
        this.$toast.loading({
          message: '保存中',
          // 禁止背景点击
          forbidClick: true,
          // 持续展示
          duration: 0
        })
        try {
          await editUserData({
            name: this.nameMessage
          })
          this.$toast.success('修改昵称成功')
          // 关闭弹层
          this.$emit('close')
          // 更新昵称
          this.userData.name = this.nameMessage
        } catch (err) {
          // console.log(err)
          this.$toast.fail('修改昵称失败')
        }
      } else {
        return this.$toast.fail('昵称不能为空')
      }
    },
    // 取消修改名字
    cancelName () {
      this.$emit('close')
      this.nameMessage = this.userData.name
    }
  },
  computed: {
    ...mapState(['userData'])
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 10px;
}
</style>
