import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router/router'
import Store from 'store/store.js'
import iview from 'iview'
import VueParticles from 'vue-particles'
import formCreate from '@form-create/iview'
import 'iview/dist/styles/iview.css'
import './style/base.less'
// 载入权限验证
import './permission'
Vue.use(Vuex)
Vue.use(VueParticles)

Vue.use(iview)

Vue.use(formCreate)

const store = Store()

new Vue({
  
  render: c => c(App),
  router,
  store
}).$mount('#app')

// js模块开启 HMR
if (module.hot) {
  module.hot.accept()
}
