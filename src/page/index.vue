<!--登陆首页-->
<template>
  <div class="index">
    <div class="header">
      <div class="Myproject">
        <a href=""></a>
        <Icon class="project" color="#39f" type="navicon"></Icon>
      </div>
    </div>
    <div class="content">
      <ul class="nav">
        <li v-for="(item,index) in modularlist" :class="{ project_list:true, activepl:item.showactive }"
            @click="activeSelected(index)">{{item.showactive}}---{{item.modularname}}
        </li>
        <li>
          <Button class="modelButton f14" type="primary" @click="addmodularState" icon="android-add">添加模块</Button>
        </li>
      </ul>
      <ul class="nav">
        <li v-for="(item, index) in apilist" class="project_list">{{item.apiname}}</li>
        <li>
          <Button class="modelButton f14" type="primary" icon="android-add" @click="addapiState">添加新接口</Button>
        </li>
      </ul>
      <!--项目口-->
      <div>
        <router-view></router-view>
      </div>
    </div>
    <!--弹窗-->
    <Addmodular v-if="amlState" :pjid="pjid" @listModularNav="listModularNav"
                @amlStateFn="addmodularState"></Addmodular>
    <Addapi v-if="apiState" :mlid="mlid" @listModularNav="listModularNav"
            @apiStateFn="addapiState"></Addapi>
  </div>
</template>
<script type="text/ecmascript-6">
  import Addmodular from './newlybuild/addmodular.vue'
  import Addapi from './newlybuild/addapi.vue'
  export default {
    name: 'index',
    data () {
      return {
        navState: false,
        amlState: false,
        apiState: false,
        pjid: '',
        mlid: '',
        apiid: '',
        modularlist: [],
        apilist: [],
        logs: []
      }
    },
    watch: {
      modularlist: {
        handler: function (val, oldVal) {
        },
        deep: true
      }
    },
    mounted () {
      this.pjid = this.$route.query.uuid
      this.listModularNav()
      if (!this.$tpStorage(this.pjid)) {
        this.$tpStorage(this.pjid, '0')
      }
    },
    methods: {
//      创建窗口开关
      addmodularState () {
        this.amlState = !this.amlState
      },
      addapiState () {
        this.apiState = !this.apiState
      },
//      列表数据请求
      listModularNav () {
        let data = {
          uuid: this.pjid
        }
        this.modularlist = []
        let _this = this
        this.$http.get('http://127.0.0.1:3000/catalog/query', {
          params: data
        }).then(res => {
          res.body.string.forEach(function (val) {
            val.showactive = false
            _this.modularlist.push(val)
          })
          console.log(this.$tpStorage(this.pjid))
          let x = this.$tpStorage(this.pjid)
          this.modularlist[x].showactive = true
          this.mlid = this.modularlist[x]._id
          this.apilist = this.modularlist[x].apilist
        })
      },
//      选中状态
      activeSelected (i) {
        console.log('设置', i)
        this.$tpStorage(this.pjid, i.toString())
        this.mlid = this.modularlist[i]._id
        if (this.modularlist[i].apilist.length > 0) {
          this.apilist = this.modularlist[i].apilist
        } else {
          this.apilist = [{apiname: '空'}]
        }
        let _this = this
        this.modularlist.forEach(function (val, a) {
          _this.modularlist[a].showactive = false
        })
        this.modularlist[i].showactive = true
      }
    },
    components: {
      Addmodular,
      Addapi
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
    .content {
      width: 100%;
      height: calc(100% - 38px);
      overflow: hidden;
      position: relative;
      .nav {
        width: 240px;
        height: 100%;
        overflow: hidden;
        display: block;
        float: left;
        border-right: 1px solid #ccc;
        &:last-of-type .project_list {
          font-size: 14px;
          font-weight: inherit;
          &:hover {
            background: #ccc;
          }
        }
        .project_list {
          padding: 0px 20px 0 20px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          color: #333;
          line-height: 2;
          &:hover {
            background: #aaa;
          }
        }
        .activepl {
          background: #aaa;
        }
        .modelButton {
          width: 80%;
          margin-left: 10%;
          margin-top: 20px;
          color: #fff;
          &:hover {
            color: #fff;
            background: #36f;
          }
        }

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
        transform-origin: 20px top;
        transform: scale(0);
      }
      50% {
        transform-origin: 20px top;
        transform: scale(1.5);
      }
      100% {
        transform-origin: 20px top;
        transform: scale(1);
      }
    }
    @keyframes bounce-out {
      0% {
        transform-origin: 20px top;
        transform: scale(1);
      }
      50% {
        transform-origin: 20px top;
        transform: scale(1.5);
      }
      100% {
        transform-origin: 20px top;
        transform: scale(0);
      }
    }
  }
</style>
