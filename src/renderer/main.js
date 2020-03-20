import Vue from 'vue'
import axios from 'helper/axios'

import ElementUI from 'element-ui';
import 'assets/style/elementui/index.css';

import App from './App'
import router from './packages/router'
import store from './packages/store'

Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
