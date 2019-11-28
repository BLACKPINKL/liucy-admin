import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router/router'
import Store from 'store/store.js'
import iview from 'iview'
import common from 'utils/common.js'
import VueParticles from 'vue-particles'
import formCreate from '@form-create/iview'
import 'iview/dist/styles/iview.css'
import './style/base.less'
// 载入权限验证
import './permission'
Vue.use(Vuex)
Vue.use(VueParticles)
// 全局混入 公共方法
Vue.mixin(common)

Vue.use(iview)


// 全局挂载 modal
// Vue.prototype.$Modal = Modal
// Vue.prototype.$Message = Message
// Vue.prototype.$Spin = Spin
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
