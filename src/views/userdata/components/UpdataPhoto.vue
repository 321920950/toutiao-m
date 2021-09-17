<template>
  <div class="update-photo">
    <img class="img"
         :src="img"
         ref="img">
    <div class="toolbar">
      <div class="cancel"
           @click="onCancel">取消</div>
      <div class="confirm "
           @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhotoData } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'UpdataPhoto',
  props: {
    img: {
      type: [String, Object],
      require: true
    }
  },
  data () {
    return {
      cropper: null, // 裁截器实例
      image: null
    }
  },
  mounted () {
    this.image = this.$refs.img
    this.cropper = new Cropper(this.image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: true,
      background: false
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端裁切使用getData 方法获取裁切参数
      // console.log(this.cropper.getData())
      // 基于客户端 采用这种 getCroppedCanvas() 获取裁切的文件对象
      this.$toast.loading({
        message: '保存中',
        // 禁止背景点击
        forbidClick: true,
        // 持续展示
        duration: 0
      })
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data: res } = await editUserPhotoData(formData)
          this.userData.photo = res.data.photo
          console.log(res)
          // 关闭头像弹出框
          this.$emit('close')
          this.$toast.success('修改头像成功')
        } catch (err) {
          this.$toast.fail('修改头像失败')
        }
      })
    },
    // 取消
    onCancel () {
      // this.cropper = null
      // console.log(this.cropper)
      // this.image = this.$refs.img
      this.$emit('close')
    }
  },
  computed: {
    ...mapState(['userData'])
  }
}

</script>

<style scoped lang="less">
.update-photo {
  height: 100%;
  background-color: #000;
  .toolbar {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    justify-content: space-between;
    background-color: #000;
    .cancel,
    .confirm {
      display: flex;
      width: 90px;
      height: 90px;
      font-size: 20px;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
