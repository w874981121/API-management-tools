<template>
  <div class="registerUser">
    <div class="register-window">
      <h1>注册用户</h1>
      <Input class="register-input" placeholder="请输入注册账号" size="large" v-model="username">
      <Icon slot="prepend" class="register-icon" type="person"></Icon>
      </Input>
      <Input class="register-input" placeholder="请输入注册密码" size="large" v-model="password">
      <Icon slot="prepend" class="register-icon" type="key"></Icon>
      </Input>
      <Input class="register-input" placeholder="请重复输入密码" size="large" v-model="password2">
      <Icon slot="prepend" class="register-icon" type="key"></Icon>
      </Input>
      <Input class="register-input" placeholder="注册邀请码" size="large" v-model="invitationcode">
      <Icon slot="prepend" class="register-icon" type="ios-glasses"></Icon>
      </Input>
      <div class="register-button-box">
        <router-link to="/" tag="span">
          <Button class="register-button" size="large" type="success" long>返回登陆</Button>
        </router-link>
        <Button class="register-button" @click="userVerification" size="large" type="success" long>提交申请</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'register',
    data () {
      return {
        username: '',
        password: '',
        password2: '',
        invitationcode: ''
      }
    },
    methods: {
      userVerification () {
        let data = {}
        if (this.username) {
          data.username = this.username
        }
        if (this.password) {
          data.password = this.password
        }
        if (this.invitationcode) {
          data.invitationcode = this.invitationcode
        }

        if (this.password === this.password2) {
          this.$http.get('http://127.0.0.1:3000/login/register', {
            params: data
          }).then(function (res) {
            if (res.body.state) {
              this.$Message.success(res.body.prompt)
            } else {
              this.$Message.error(res.body.prompt)
            }
          })
        } else {
          this.$Message.error('两次输入密码不相同，请重新输入')
          this.password = ''
          this.password2 = ''
        }
      }

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .registerUser {
    width: 100%;
    height: 100%;
    background: url("../assets/5c986c4e3c6fd63df700ab9d413bedaa.jpg") no-repeat;
  }

  .register-window {
    width: 360px;
    height: 400px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    right: 200px;
    top: 50%;
    margin-top: -200px;
    h1 {
      margin: 25px 0;
      text-align: center;
    }
    .register-input {
      width: 80%;
      margin: 20px 10%;
      .register-icon {
        width: 30px;
        font-size: 18px;
      }
    }
    .register-button-box {
      .register-button {
        width: 120px;
        margin-left: 40px;
      }
    }
  }

</style>
