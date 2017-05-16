// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './css/_base.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'

var MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  Vue.prototype.$tpStorage = function (take, options) {
    let tpStorage = window.sessionStorage
    if (!options) {
      return tpStorage[take]
    } else {
      tpStorage[take] = options
      return true
    }
  }
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueResource)
Vue.use(MyPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
