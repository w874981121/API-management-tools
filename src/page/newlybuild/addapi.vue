<!--添加新项目-->
<template>
  <div id="addapi">
    <div class="box">
      <h2>添加新接口</h2>
      <Input class="newinput" placeholder="请输入api名称" v-model="name"></Input>
      <Input class="newinput" v-model="describe" type="textarea" :rows="4" placeholder="请输入api描述"></Input>
      <Button class="establish-button" @click="stablisheModular" size="large" type="success" long>添加</Button>
      <div class="close_x" @click="closeState">
        <Icon type="close"></Icon>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'addapi',
    props: ['mlid'],
    data () {
      return {
        name: '',
        describe: ''
      }
    },
    methods: {
      closeState () {
        this.$emit('apiStateFn')
      },
      stablisheModular () {
        let data = {
          apiname: this.name,
//          describe: this.describe,
          uuid: this.pjid,
          modularid: this.mlid
        }
        console.log(data)
        this.$http.get('http://127.0.0.1:3000/catalog/addapi', {
          params: data
        }).then(res => {
          console.log(res)
          if (res.body.state) {
            this.$Message.success(res.body.prompt)
            this.closeState()
            this.$emit('listModularNav')
          } else {
            this.$Message.error(res.body.prompt)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  #addapi {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    .box {
      width: 360px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h2 {
        margin-top: 20px;
        text-align: center;
      }
      .close_x {
        position: absolute;
        top: 4px;
        right: 5px;
        font-size: 16px;
      }
    }

    .newinput {
      width: 280px;
      font-size: 14px;
      margin: 20px 40px 0 40px;
    }

    .establish-button {
      margin: 40px;
      width: 280px;
    }
  }
</style>
