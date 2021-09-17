<template>
  <div class="updata-birthday">
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="onCanfirm" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import daijs from 'dayjs'
import { editUserData } from '@/api/user.js'
export default {
  name: 'UpdataBirthday',
  created () {
    this.currentDate = new Date(this.userData.birthday)
  },
  data () {
    return {
      currentDate: '',
      minDate: new Date(1950, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    // 确定
    async onCanfirm () {
      this.$toast.loading({
        message: '保存中',
        // 禁止背景点击
        forbidClick: true,
        // 持续展示
        duration: 0
      })
      try {
        await editUserData({
          birthday: daijs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$toast.success('修改性别成功')
        // 关闭弹层
        this.$emit('close')
        // 更新性别
        this.userData.birthday = daijs(this.currentDate).format('YYYY-MM-DD')

        console.log(daijs(this.currentDate).format('YYYY-MM-DD'))
      } catch (err) {
        // console.log(err)
        this.$toast.fail('修改性别失败')
      }
    }
    // // 取消
    // onCancel () {
    //   this.$emit('close')
    // }
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
