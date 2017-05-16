<!--登陆-->
<template>
  <div class="loginSystem">
    <div class="login-window">
      <h1>登录API管理系统</h1>
      <Input class="login-input" placeholder="请输入账号" size="large" v-model="username">
      <Icon slot="prepend" class="login-icon" type="person"></Icon>
      </Input>
      <Input class="login-input" placeholder="请输入密码" size="large" v-model="password">
      <Icon slot="prepend" class="login-icon" type="key"></Icon>
      </Input>
      <!--<div class="login-input f0">-->
      <!--<Input class="input-vc" placeholder="请输入验证码" size="large" v-model="Verificationcode"></Input>-->
      <!--<div class="img-vc" @click="loginClickAjax">-->
      <!--<img :src="srcvc" alt="验证码">-->
      <!--</div>-->
      <!--</div>-->
      <Button class="login-input" @click="loginClickAjax" size="large" type="success" long>登录</Button>
      <router-link class="register" to="/register">注册用户</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        Verificationcode: '',
        srcvc: ''
      }
    },
    mounted () {
      let tpStorage = window.sessionStorage
      if (tpStorage['username'] !== 'undefined') {
        this.username = tpStorage['username']
      }
    },
    methods: {
      loginClickAjax () {
        let data = {}
        let tpStorage = window.sessionStorage
        if (this.username) {
          data.username = this.username
        }
        if (this.password) {
          data.password = this.password
        }
        if (this.Verificationcode) {
          data.vc = this.Verificationcode
        }
        this.$http.get('http://127.0.0.1:3000/login/go', {
          params: data
        }).then(res => {
          if (res.body.state) {
            this.$router.push({path: '/nbproject'})
            tpStorage.uuid = res.body.uuid
            tpStorage.username = res.body.username
            console.log(res.body.uuid)
            this.$Message.success(res.body.prompt)
            sessionStorage.setItem('uuid', res.body.uuid)
            sessionStorage.setItem('nickname', res.body.nickname)
          } else {
            this.$Message.error(res.body.prompt)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .loginSystem {
    width: 100%;
    height: 100%;
    background: url("../assets/5c986c4e3c6fd63df700ab9d413bedaa.jpg") no-repeat;
  }

  .f0 {
    font-size: 0;
  }

  .login-window {
    width: 360px;
    height: 320px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    right: 160px;
    top: 50%;
    margin-top: -190px;
    h1 {
      margin: 35px 0;
      text-align: center;
    }
    .login-input {
      width: 280px;
      margin: 20px 40px 0 40px;
      .login-icon {
        width: 30px;
        font-size: 18px;
      }
      .input-vc {
        width: 160px;
        margin-right: 20px;
      }
      .img-vc {
        vertical-align: middle;
        display: inline-block;
        height: 36px;
        width: 100px;
        overflow: hidden;
        border: 1px solid #ccc;
        img {
          display: block;
          border-radius: 4px;
          width: 100%;
          font-size: 12px;
          height: 36px;
        }
      }
    }
  }

  .register {
    display: block;
    width: 100px;
    margin: 40px auto 0 auto;
    text-align: center;
  }
</style>
