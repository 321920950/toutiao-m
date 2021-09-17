<template>
  <div class="user-data">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="个人中心"
                 left-arrow
                 @click-left="$router.back()"></van-nav-bar>

    <!-- 个人信息 -->
    <!-- 弹出选择头像 -->
    <input type="file"
           ref="file"
           hidden
           accept="image/*"
           @change="onFileChange">
    <!-- 头像信息 -->
    <van-cell title="头像"
              center
              @click="$refs.file.click()"
              is-link>
      <van-image class="image-data"
                 width="1rem"
                 height="1rem"
                 fit="cover"
                 round
                 :src="userDate.photo" />
    </van-cell>
    <van-cell title="昵称"
              is-link
              @click="isUpdataNameShow = true"
              :value="userDate.name"></van-cell>
    <van-cell title="性别"
              is-link
              @click="isUpdatagenderShow = true"
              :value="userDate.gender ? '女' : '男'">

    </van-cell>
    <van-cell title="生日"
              is-link
              @click="isUpdatabirthdayShow = true"
              :value="userDate.birthday"></van-cell>

    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isUpdataNameShow"
               style="height: 100%"
               position="top">
      <UpdataName @close="isUpdataNameShow = false"></UpdataName>
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdatagenderShow"
               position="bottom">
      <UpdataGender @close="isUpdatagenderShow = false"></UpdataGender>
    </van-popup>
    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isUpdatabirthdayShow"
               position="bottom">
      <UpdataBirthday @close="isUpdatabirthdayShow = false"></UpdataBirthday>
    </van-popup>
    <!-- 编辑头像弹出层 -->
    <van-popup v-model="isUpdataphotoShow"
               style="height: 100%"
               position="bottom">
      <UpdataPhoto @close="onCancel"
                   :img="img"></UpdataPhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserData } from '@/api/user.js'
import UpdataName from './components/UpdataName.vue'
import UpdataGender from './components/UpdataGender.vue'
import UpdataBirthday from './components/UpdataBirthday.vue'
import UpdataPhoto from './components/UpdataPhoto.vue'
export default {
  name: 'userData',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto
    // UpdataName: () => import('./components/UpdataName.vue'),
    // UpdataGender: () => import('./components/UpdataGenderer.vue'),
    // UpdataBirthday: () => import('./components/UpdataBirthday.vue'),
    // UpdataPhoto: () => import('./components/UpdataPhoto.vue')
  },
  data () {
    return {
      userDate: {},
      isUpdataNameShow: false,
      isUpdatagenderShow: false,
      isUpdatabirthdayShow: false,
      isUpdataphotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserData()
  },
  methods: {
    async loadUserData () {
      try {
        const { data: res } = await getUserData()
        this.userDate = res.data
        this.$store.commit('setUserData', this.userDate)
        // console.log(this.userDate)
      } catch (err) {
        this.$toast.fail('获取用户个人资料失败')
      }
    },
    // 更换头像
    onFileChange () {
      // window.URL.revokeObjectURL(this.img)
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blib数据
      // this.img = null
      this.img = window.URL.createObjectURL(file)
      // file-input 如果选择同个文件不会触发chage事件
      // 解决方法> 每次使用完毕,把他的value清空
      this.$refs.file.value = ''
      this.isUpdataphotoShow = true
    },
    // 取消更换
    onCancel () {
      this.isUpdataphotoShow = false
    }
  }

}
</script>

<style scoped lang="less">
.user-data {
  .image-data {
    width: 30px;
    height: 30px;
  }
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
