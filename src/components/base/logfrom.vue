<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorTxt }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ pwdError.errorTxt }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let errorTxt, status
      if (!/@/g.test(this.usernameModel)) {
        errorTxt = '不包含@'
      } else {
        status = true
      }
      if (!this.userErrorsFlag) { // 第一次不显示
        errorTxt = ''
        this.userErrorsFlag = true
      }
      return {
        errorTxt,
        status
      }
    },
    pwdError () {
      let errorTxt, status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        errorTxt = '密码不是1-6位'
      } else {
        status = true
      }
      if (!this.pwdErrorFlag) { // 第一次不显示
        errorTxt = ''
        this.pwdErrorFlag = true
      }
      return {
        errorTxt,
        status
      }
    }
  },
  methods: {
    onLogin () {
      if (!(this.userErrors.status && this.pwdError.status)) {
        this.errorText = '表单校验不通过'
      } else if (this.usernameModel !== 'banzu@' && this.passwordModel !== '123123') {
        this.errorText = '您还没有注册'
      } else {
        this.$http.post('api/login').then((res) => {
          this.$emit('has-log', res.data)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
