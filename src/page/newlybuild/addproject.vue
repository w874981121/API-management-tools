<!--添加新项目-->
<template>
  <div id="addproject">
    <div class="box">
      <h2>创建新的文档</h2>
      <Input class="newinput" placeholder="请输入项目名称" v-model="name"></Input>
      <Input class="newinput" v-model="describe" type="textarea" :rows="4" placeholder="请输入项目描述"></Input>
      <Button class="establish-button" @click="stablisheFile" size="large" type="success" long>创建</Button>
      <div class="close_x" @click="closeState()">
        <Icon type="close"></Icon>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'addproject',
    data () {
      return {
        name: '',
        describe: ''
      }
    },
    methods: {
      closeState () {
        this.$emit('ajStateFn')
      },
      stablisheFile () {
        let tpStorage = window.sessionStorage
        let data = {
          filename: this.name,
          describe: this.describe,
          uuid: tpStorage['uuid']
        }
        this.$http.get('http://127.0.0.1:3000/file/project', {
          params: data
        }).then(res => {
          if (res.body.state) {
            this.$Message.success(res.body.prompt)
            this.closeState()
            this.$emit('listProjectNav')
          } else {
            this.$Message.error(res.body.prompt)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  #addproject {
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
