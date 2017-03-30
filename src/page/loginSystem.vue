<template>
  <div class="loginSystem">
    <div class="login-window">
      <h1>登录API管理系统</h1>
      <Input class="login-input" size="large" v-model="value">
      <span slot="prepend">
          <Icon class="login-icon" type="person"></Icon>
      </span>
      </Input>
      <Input class="login-input" size="large" v-model="value">
      <span slot="prepend">
        <Icon class="login-icon" type="key"></Icon>
      </span>
      </Input>
      <Button class="login-input" size="large" type="success" long>确认提交</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .loginSystem {
    width: 100%;
    height: 100%;
    background: url("../assets/5c986c4e3c6fd63df700ab9d413bedaa.jpg") no-repeat;
  }
  .login-window {
    width: 360px;
    height: 360px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    right: 200px;
    top: 50%;
    margin-top: -180px;
    h1 {
      margin: 35px 0;
      text-align: center;
    }
    .login-input{
      width: 80%;
      margin: 20px 10%;
      .login-icon{
        width: 30px;
        font-size: 18px;
      }
    }
  }
</style>
