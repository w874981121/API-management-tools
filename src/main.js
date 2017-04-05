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

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
