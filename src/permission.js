import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Vue from 'vue'
import { getCookie, removeCookie } from 'utils/cookie'
// import {filterAsyncRoutes} from 'utils'
import router from 'router/router'
// import Store from "store/store";
// import Vuex from 'vuex'
// Vue.use(Vuex)
// NProgress 配置
NProgress.configure({ showSpinner: false })
// const store = Store()

// 全局导航守卫

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.path === '/login') {
    if(getCookie('token')) {
      next({ path: '/' })
      NProgress.done()
    }else {
      next()
    }
  }else {
    if(getCookie('token')) {
      // 说明没有拉取用户信息
      next()
    }else {
      next({path: '/login'})
      NProgress.done()
    }
  }

})


router.afterEach((to, from) => {
  NProgress.done()
})