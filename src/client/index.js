import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './vuex/store'
Vue.config.debug = true
Vue.use(Router)
Vue.prototype.$http = axios
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login' //默认主页
  }, {
    path: '/login',
    component: resolve => require(['./components/page/login.vue'], resolve)
  }, {
    path: '/index',
    component: resolve => require(['./components/common/home.vue'], resolve),
    children: [{
      path: '/',
      component: resolve => require(['./components/page/index.vue'], resolve)
    }, {
      path: '/manager',
      component: resolve => require(['./components/page/manager.vue'], resolve)
    }, {
      path: '/query',
      component: resolve => require(['./components/page/query.vue'], resolve)
    }, {
      path: '/maker',
      component: resolve => require(['./components/page/maker.vue'], resolve)
    }, {
      path: '/main',
      component: resolve => require(['./components/page/main.vue'], resolve)
    }, {
      path: '/myfct',
      component: resolve => require(['./components/page/myfct.vue'], resolve)
    }, {
      path: '/buy',
      component: resolve => require(['./components/page/buy.vue'], resolve)
    }, {
      path: '/change',
      component: resolve => require(['./components/page/change.vue'], resolve)
    }, {
      path: '/message',
      component: resolve => require(['./components/page/message.vue'], resolve)
    }, {
      path: '/die',
      component: resolve => require(['./components/page/die.vue'], resolve)
    }]
  }]
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    from.name ? next({
      name: from.name
    }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
});
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render(createElement) {
    return createElement(App)
  }
})