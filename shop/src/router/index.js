import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //name: 'HelloWorld',
      component: Login
    },
    {
      path: '/home',
      //name: 'HelloWorld',
      component: Home
    },
    
  ],
  mode:'history'
})
