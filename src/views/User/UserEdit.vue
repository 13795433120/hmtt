<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="user.photo" @click="pickInput"/>
          <input type="file" ref="inputImg" v-show="false" accept="image/*" @change="changeAvatar">
        </template>
      </van-cell>
      <van-cell title="名称" is-link  :value="user.name" @click="showInput = true"/>
      <van-cell title="生日" is-link  :value="user.birthday" @click="showPopup = true"/>
    </van-cell-group>
    <van-dialog v-model="showInput" title="修改名称" show-cancel-button :before-close="checkEdit">
      <input type="text" v-model.trim="username">
    </van-dialog>
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserIntroAPI, changeAvatarAPI, changeUserIntroAPI } from '@/api'
import { Notify } from 'vant'
import { timetrans } from '@/utils/date'
export default {
  name: 'UserEdit',
  data () {
    return {
      user: {},
      showInput: false,
      username: '',
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: {},
      showPopup: false
    }
  },
  async created () {
    const res = await getUserIntroAPI()
    console.log(res)
    this.user = res.data.data
    this.username = this.user.name
    this.currentDate = new Date(res.data.data.birthday)
  },
  methods: {
    pickInput () {
      this.$refs.inputImg.click()
    },
    async changeAvatar (e) {
      const newImg = e.target.files[0]
      if (e.target.files.length === 0) {
        return
      }
      const fd = new FormData()
      fd.append('photo', newImg)
      const res = await changeAvatarAPI(fd)
      console.log(res)
      this.user.photo = res.data.data.photo
    },
    checkEdit (action, done) {
      if (action === 'confirm') {
        const checkline = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (checkline.test(this.username)) {
          changeUserIntroAPI({
            name: this.username
          })
          this.user.name = this.username
          done()
        } else {
          Notify({ type: 'warning', message: '用户名中英文和数字1-7位' })
          done(false)
        }
      } else {
        done()
      }
    },
    confirmFn (value) {
      this.user.birthday = timetrans(value)
      changeUserIntroAPI({
        birthday: timetrans(value)
      })
      this.showPopup = false
    },
    cancelFn () {
      this.showPopup = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content{
  text-align: center;
  input{
    text-align: center;
    padding: 0;
    border:none;
    outline:none;
  }
}

</style>
