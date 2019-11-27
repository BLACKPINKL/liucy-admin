import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import { getCookie, removeCookie } from 'utils/cookie'
import {filterAsyncRoutes} from 'utils'
import router from 'router/router'
import Store from "store/store";
import Vuex from 'vuex'
Vue.use(Vuex)
// NProgress 配置
NProgress.configure({ showSpinner: false })
const store = Store()

// 全局导航守卫

router.beforeEach((to, from, next) => {
  NProgress.start()
  // var arr = []
  // store.dispatch('asyncSetRules', arr)
            
  // // 动态添加路由
  // router.addRoutes(arr)
  next()

})


router.afterEach((to, from) => {
  NProgress.done()
})