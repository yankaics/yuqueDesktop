import Vue from 'vue'
import axios from 'helper/axios'
import db from "./packages/modules/DataStore";

import ElementUI from 'element-ui';
import 'assets/style/elementui/index.css';
import 'assets/style/reset.css';


import App from './App'
import router from './packages/router'
import store from './packages/store'

Vue.use(ElementUI);

Vue.prototype.$db = db;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 全局变量
window.openedWin = [];


// vue
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
