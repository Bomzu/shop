<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="regUserModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ regUseError.errorTxt }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="text" v-model="regPassWordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ regPassWordError.errorTxt }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">二次确认密码：</span>
        <div class="g-form-input">
          <input type="text" v-model="regTwoPassWordModel" placeholder="请再次输入密码">
        </div>
        <span class="g-form-error">{{ regTwoPassWordError.errorTxt }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onReg">注册</a>
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
      regUserModel: '',
      regPassWordModel: '',
      regTwoPassWordModel: '',
      errorText: ''
    }
  },
  computed: {
    regUseError () {
      let errorTxt, status
      if (!/@/g.test(this.regUserModel)) {
        errorTxt = '不包含@'
      } else {
        status = true
      }
      if (!this.regUserModelFlag) {
        errorTxt = ''
        this.regUserModelFlag = true
      }
      return {
        status,
        errorTxt
      }
    },
    regPassWordError () {
      let errorTxt, status
      if (!/^\w{1,6}$/g.test(this.regPassWordModel)) {
        errorTxt = '密码不是1-6位'
      } else {
        status = true
      }
      if (!this.regPassWordModel) {
        errorTxt = ''
        this.regUserModelFlag = true
      }
      return {
        status,
        errorTxt
      }
    },
    regTwoPassWordError () {
      let errorTxt, status
      if (!/^\w{1,6}$/g.test(this.regTwoPassWordModel)) {
        errorTxt = '密码不是1-6位'
      } else if (this.regTwoPassWordModel !== this.regPassWordModel) {
        errorTxt = '两次密码不匹配'
      } else {
        status = true
      }
      if (!this.regTwoPassWordModel) {
        errorTxt = ''
        this.regUserModelFlag = true
      }
      return {
        status,
        errorTxt
      }
    }
  },
  methods: {
    onReg () {
      if (!(this.regUseError.status && this.regPassWordError.status && this.regTwoPassWordError.status)) {
        this.errorText = '校验不通过'
      } else {
        this.$emit('on-reg', this.regUserModel)
        /* this.$hppt.post('api/reguser').then((res) => {
          // 注册成功后登录
          this.$emit('on-reg', res.data)
        }, (err) => {
          console.log(err)
        }) */
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content {
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
