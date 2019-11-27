import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router/router'
import Store from 'store/store.js'
// import iView from 'iview'
import common from 'utils/common.js'
import VueParticles from 'vue-particles'
import 'iview/dist/styles/iview.css'
import './style/base.less'
// 载入权限验证
import './permission'
Vue.use(Vuex)
Vue.use(VueParticles)
// 全局混入 公共方法
Vue.mixin(common)

// iview按需引入组件
import {
  Button,
  Tag,
  Input,
  Table,
  Sider,
  Menu,
  MenuItem,
  Submenu,
  Layout,
  Header,
  Content,
  Icon,
  Modal,
  Message,
  Divider,
  Page,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload,
  Form,
  FormItem,
  Row,
  Col,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Spin,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Slider,
  DatePicker
} from 'iview'
Vue.component('Button', Button)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('DatePicker', DatePicker)
Vue.component('Carousel', Carousel)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('CarouselItem', CarouselItem)
Vue.component('Input', Input)
Vue.component('Slider', Slider)
Vue.component('Tag', Tag)
Vue.component('Page', Page)
Vue.component('Table', Table)
Vue.component('Modal', Modal)
Vue.component('Sider', Sider)
Vue.component('Divider', Divider)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)
Vue.component('Content', Content)
Vue.component('Header', Header)
Vue.component('Upload', Upload)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Spin', Spin)

// 全局挂载 modal
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin


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
