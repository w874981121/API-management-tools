<template>
  <div class="registerUser">
    <div class="register-window">
      <h1>注册用户</h1>
      <Input class="register-input" placeholder="请输入注册账号" size="large" v-model="account">
      <span slot="prepend">
          <Icon class="register-icon" type="person"></Icon>
      </span>
      </Input>
      <Input class="register-input" placeholder="请输入注册密码" size="large" v-model="password">
      <span slot="prepend">
        <Icon class="register-icon" type="key"></Icon>
      </span>
      </Input>
      <Input class="register-input" placeholder="请重复输入密码" size="large" v-model="password">
      <span slot="prepend">
        <Icon class="register-icon" type="key"></Icon>
      </span>
      </Input>
      <div class="register-button">
        <Button class="register-button" @click="clickAjax" size="large" type="success" long>提交</Button>
        <Button class="register-button" @click="clickAjax" size="large" type="success" long>返回</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
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
      margin: 35px 0;
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
  }
</style>
