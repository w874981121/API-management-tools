<template>
  <div class="index">
    <div class="header">
      <div class="Myproject" @click="navLeftClick">
        <Icon class="project" color="#39f" type="navicon"></Icon>
      </div>
    </div>

    <div class="content">

    <transition name="bounce">
      <ul v-show="navleft" class="projectnav">
      <Button class="f14" type="primary" icon="plus">新建项目</Button>
      <router-link to="/foo" tag="li">1号</router-link>
      </ul>
    </transition>

    <ul class="nav">
      <Button class="f14" type="primary" icon="plus">新建模块</Button>
      <router-link to="/foo" tag="li">1号</router-link>
    </ul>

    <div>
      <router-view></router-view>
    </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'index',
    data () {
      return {
        navleft: true
      }
    },
    methods: {
      navLeftClick () {
        this.navleft = !this.navleft
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .f14 {
    font-size: 14px;
  }
  .f20 {
    font-size: 20px;
  }
  .index {
    width: 100%;
    height: 100%;
    .header {
      height: 38px;
      border-bottom: 1px solid #ccc;
      .Myproject {
        width: 38px;
        height: 38px;
        .project {
          width: 38px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          font-size: 30px;
        }
      }
    }
    .content{
      width: 100%;
      height: calc(100% - 38px);
      background: #eee;
      overflow: hidden;
      position: relative;
      .projectnav{
        position: absolute;
        top:0;
        left: 0;
        width: 300px;
        height:900px;
        z-index: 99;
        background: #000;
      }
      .nav {
        width: 250px;
        height: 300px;
        overflow: hidden;
        display: block;
        background: #ddd;
        float: left;
      }
    }
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-out .5s;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes bounce-out {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
    }
  }
</style>
