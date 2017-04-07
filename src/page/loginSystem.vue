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
      <div class="login-input f0">
        <Input class="input-vc" placeholder="请输入验证码" size="large" v-model="Verificationcode"></Input>
        <div class="img-vc" @click="Ajax">
          <img :src="vc" alt="验证码">
        </div>
      </div>
      <Button class="login-input" @click="clickAjax" size="large" type="success" long>登录</Button>
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
        vc: ''
      }
    },
    mounted () {
      this.Ajax()
    },
    methods: {
      Ajax () {
        this.$http.get('http://172.20.187.76:3000/vc', {
          params: {
            username: this.username
          }
        }).then(res => {
          console.log(res)
          this.vc = 'data:image/png;base64,' + res.body.vc
        })
      },
      clickAjax () {
        this.$http.get('http://172.20.187.76:3000/vc/Verificationcode', {
          params: {
            Verificationcode: this.Verificationcode
          }
        }).then(res => {
          console.log(res)
          if (!res.body.statr) {
            this.vc = 'data:image/png;base64,' + res.body.vc
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
    height: 380px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    right: 200px;
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
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
</style>
