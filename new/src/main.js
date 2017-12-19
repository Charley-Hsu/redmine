import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Echarts from 'echarts'
import VueRouter from 'vue-router'
import Axios from 'axios'
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
Vue.use(ElementUI) // vue全局设置
Vue.use(VueRouter)
Vue.use(Echarts)
import Login from './components/Login'
import Search from './components/Search'
import MapDemo from './components/MapDemo'
import UiDemo from './components/ContentDemo'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/', // 默认首页打开是登录页
    component: Login
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/map',
    component: MapDemo
  }, {
    path: '/content',
    component: UiDemo
  }, {
    path: '*',
    redirect: '/' // 输入其他不存在的地址自动跳回首页
  }]
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  if (to.path === '/') { // 如果是跳转到登录页的
    if (token !== 'null' && token !== null) {
      next('/search') // 如果有token就转向Search不返回登录页
    }
    next() // 否则跳转回登录页
  } else {
    if (token !== 'null' && token !== null) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 注意Bearer后有个空格
      next() // 如果有token就正常转向
    } else {
      next('/') // 否则跳转回登录页
    }
  }
})
new Vue({
  router: router, // 启用router
  render: h => h(App)
}).$mount('#app') // 挂载到id为app的元素上
