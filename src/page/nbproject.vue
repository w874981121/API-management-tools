<template>
  <div>
    <div class="projectnav">
      <Button class="projectButton f14" @click="addprojectState" type="primary" icon="plus">新建项目</Button>
      <ul>
        <router-link tag="li" v-for="(tem,i) in listprojectnav" :key="tem._id" @click="jumpProject(tem._id)"
                     :to="{ path: '/index', query: { uuid: tem._id }}">
          <h3>{{tem.filename}}</h3>
          <p>{{tem.describe}}</p>
        </router-link>
      </ul>
    </div>
    <!--创建项目窗口-->
    <Addproject v-if="ajState" @listProjectNav="listProjectNav" @ajStateFn="addprojectState"></Addproject>
  </div>
</template>

<script type="text/ecmascript-6">
  import Addproject from './newlybuild/addproject.vue'
  export default {
    name: 'nbproject',
    data () {
      return {
        ajState: false,
        listprojectnav: []
      }
    },
    watch: {},
    mounted () {
      this.listProjectNav()
    },
    methods: {
      //      项目层数据刷新
      listProjectNav () {
        let tpStorage = window.sessionStorage
        let data = {
          uuid: tpStorage['uuid']
        }
        this.$http.get('http://127.0.0.1:3000/file/listproject', {
          params: data
        }).then(res => {
          console.log(res)
          if (res.body.state) {
            this.listprojectnav = res.body.string
          } else {
            console.info('项目为空')
          }
        })
      },
      jumpProject (id) {
        console.log(id)
      },
      //      创建窗口开关
      addprojectState () {
        this.ajState = !this.ajState
      }
    },
    components: {
      Addproject
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .projectnav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    ul {
      width: 100%;
      display: block;
      float: left;
      li {
        display: block;
        background: #fff;
        border: 1px #ccc solid;
        margin-left: 20px;
        margin-top: 20px;
        width: 180px;
        padding: 10px;
        height: 80px;
        border-radius: 4px;
        float: left;
        text-align: center;
        &:hover {
          background: #ccc;
        }
        h3 {
          font-size: 15px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
        p {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
        }
      }
    }
    .projectButton {
      margin: 0 auto;
      width: 260px;
      margin: 20px;
    }
  }
</style>
