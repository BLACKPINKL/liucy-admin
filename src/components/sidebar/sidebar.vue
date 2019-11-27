<template>
  <Menu class="menuasdasd" :style="menuSty" :active-name="activeMenu" theme="dark" :open-names="openedNames" style="width: atuo" :class="menuitemClasses">
    <SidebarItem 
    v-for="route in getRoutes"
    :key="`sidebar_item_${route.path}`"
    :item="route" 
    :baseUrl="route.path" />
  </Menu>
</template>

<script>
import SidebarItem from './components/sidebar_item'
import {mapGetters} from 'vuex'
// import {constantsRoutes} from 'router/routes'
import { getOpenedNames } from 'utils'
export default {
  name: 'sidebar',
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  mounted() {
    // console.log(this.filterHiddenRoutes(this.getRules))
  },
  computed: {
    ...mapGetters(['getRules']),
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuSty() {
      return {
        // overflow: 'scroll',
        // 'margin-right': '-17px'
      }
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    activeMenu() {
      let route = this.$route
      let { meta, path } = route
      // 如果当前路由信息中有 activeMenu字段
      // 说明当前的defaultActive需要指定
      if (meta && meta.activeMenu) return meta.activeMenu
      return path
    },
    // 过滤第一层需要隐藏的路由
    filterRoutes() {
      let router = this.getRules.filter(item => !item.hidden)
      return router
    },
    openedNames() {
      return getOpenedNames(this.getRoutes, this.$route.name)
    },
    getRoutes() {
      return this.filterRoutes
    }
  }
}
</script>

<style lang="less" scoped>
  // .menuasdasd {
  //   overflow-x: hidden !important;
  // }
</style>
