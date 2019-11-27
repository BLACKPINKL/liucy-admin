<template>
  <div class="menu_box" v-if="(!item.meta.hidden)">
    <!-- 一级菜单 无嵌套 -->
    <template v-if="isOnlyoneChildren(item.children, item) && (!onlyoneChildren.children || onlyoneChildren.noShowingChildren)">
      <MenuLink :to="resolvePath(onlyoneChildren.path)">
        <MenuItem :name="resolvePath(onlyoneChildren.path)">
          <MenuTitle :meta="onlyoneChildren.meta"/>
        </MenuItem>
      </MenuLink>
    </template>
    

    <!-- 二级菜单  有嵌套 -->
      <Submenu :name="item.name" v-else>
        <template slot="title">
          <MenuTitle :meta="item.meta"/>
        </template>
        <sidebarItem 
        v-for="child in item.children"
        :key="`sub_item_${child.path}`"
        :item="child"
        :baseUrl="resolvePath(child.path)" />
      </Submenu>

  </div>
</template>

<script>
import path from 'path'
import { findComponentUpward } from 'utils'
import MenuLink from './menu_link'
import MenuTitle from './menu_title'
export default {
  name: 'sidebarItem',
  components: {
    MenuLink,
    MenuTitle
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    baseUrl: {
      type: String,
      default: ''
    } 
    
  },
  data() {
     // 这里必须要在return的对象外部挂载一个属性
    // 如果在响应式对象里挂载 会无限递归
    this.onlyoneChildren = {}
    return {

    }
  },
  methods: {
    // 过滤路由表中的hidden 并
    isOnlyoneChildren(children = [], parent) {
      const res = children.filter(router => {
        if (router.hidden) {
          return false
        }else {
          this.onlyoneChildren = router
          return true
        }
      })
      // console.log(res)
      if (res.length === 1){
        return true
      }else if (res.length === 0) {
        this.onlyoneChildren = {...parent, path: '', noShowingChildren: true}
        return true
      }
      else {
        return false
      }
    },
    resolvePath(to) {
      return path.resolve(this.baseUrl, to)
    },
    parentComponent() {
      return findComponentUpward(this, 'Menu')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>