import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import redmine from '@/components/redmine'
import webRequment from '@/components/webRequment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/redmine',
      name: 'redmine',
      component: redmine
    },
    {
      path: '/webRequment',
      name: 'webRequment',
      component: webRequment
    }
  ]
})
