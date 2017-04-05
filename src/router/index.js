import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/loginSystem'
import Register from '@/page/registerUser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
