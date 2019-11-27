import Vue from 'vue'
import Router from 'vue-router'
import {constantsRoutes} from './routes'

Vue.use(Router)


const VueRouter = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantsRoutes
})

// export function resetRouter() {
//   const newRouter = new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantsRoutes
//   })
//   VueRouter.matcher = newRouter.matcher // reset router
// }


export default VueRouter
