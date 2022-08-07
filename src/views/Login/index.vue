<template>
  <div>
    <van-nav-bar
      title="黑马头条-登录"
    />
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="请输入11位手机号"
          :rules="[{ required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ }]"
        />
        <van-field
          v-model="user.code"
          required
          type="password"
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
        />
        <div style="margin: 16px;">
          <van-button
            :disabled="isLoading"
            :loading="isLoading"
            round
            block
            type="info"
            native-type="submit"
            loading-text="加载中..."
          >登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13795433120',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功' })
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isLoading = false
    }
  }

}
</script>

<style scoped>

</style>
