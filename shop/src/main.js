import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import qs from 'qs';
import { Message } from 'element-ui';
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
// 配置 Vue 插件
Vue.use(ElementUI);
//Vue.use(axios)
//axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//axios.defaults.baseURL='http://222.72.129.158:11700'
axios.defaults.baseURL='http://222.72.129.158:1700'
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
