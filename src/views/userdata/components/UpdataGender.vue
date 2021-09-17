<template>
  <div class="updata-gender">
    <van-picker title="性别"
                :columns="columns"
                show-toolbar
                :default-index="genderIndex"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { editUserData } from '@/api/user.js'
export default {
  name: 'UpdataGender',
  data () {
    return {
      columns: ['男', '女'],
      genderIndex: ''
    }
  },
  created () {
    this.genderIndex = this.userData.gender
  },
  methods: {
    async onConfirm () {
      try {
        this.$toast.loading({
          message: '保存中',
          // 禁止背景点击
          forbidClick: true,
          // 持续展示
          duration: 0
        })
        await editUserData({
          gender: this.genderIndex
        })
        this.$toast.success('修改性别成功')
        // 关闭弹层
        this.$emit('close')
        // 更新性别
        this.userData.gender = this.genderIndex
      } catch (err) {
        // console.log(err)
        this.$toast.fail('修改性别失败')
      }
    },
    onCancel () {
      this.genderIndex = this.userData.gender
      this.$emit('close')
    },
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  },
  computed: {
    ...mapState(['userData'])
  }
}
</script>

<style scoped lang="less">
/deep/.van-picker__confirm {
  color: #1989fa;
}
/deep/.van-picker__cancel {
  color: #1989fa;
}
</style>
