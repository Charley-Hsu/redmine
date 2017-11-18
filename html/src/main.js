// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vSelect from "vue-select"
import rm_confirm from './components/confirm/confirm.js'
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.confirm = rm_confirm;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { 
    App,
    rm_confirm
   }
})
