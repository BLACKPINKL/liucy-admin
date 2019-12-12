<template>
  <div class="layout">
    <Layout>
        <!-- <Layout class="qutan_logo_box">
          <img class="qutan_logo" src="../../assets/images/qutan.png" alt="">
        </Layout>  
         -->
         <div class="sider_box">
        <Sider 
        class="sider"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        :style="siderSty">
          <Sidebar/>
        </Sider>
        </div>
        <Layout>
            <Header
            :style="headerSty"
            class="layout-header-bar">
              <Icon @click.native="collapsedSider"
              :style="{margin: '0 20px'}"
              style="cursor: pointer"
              type="md-menu" size="24"/>
              <div class="header_item">
               <Dropdown trigger="click" @on-click="handleDropClick">
                  <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
                <DropdownMenu slot="list">
                  <DropdownItem name="logout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
               </div>
            </Header>
            <Content class="layout_content" :style="contentSty">
              <router-view />
            </Content>
        </Layout>
    </Layout>
    
  </div>
</template>

<script>
import Sidebar from 'components/sidebar'
import { removeCookie } from 'utils/cookie'
export default {
  name: 'layout',
  
  components: {
    Sidebar
  },
  data() {
    return {
      isCollapsed: false,
      headerLeft: '200px',
      contentLeft: '220px'
    }
  },
  computed: {
    // rotateIcon () {
    //   return [
    //     'menu-icon',
    //     this.isCollapsed ? 'rotate-icon' : ''
    //   ]
    // },
    headerSty() {
      return {
        padding: 0,
        width: '100%', 
        'margin-left': this.headerLeft,
        transition: 'all .2s ease-in-out',
        overflow: 'hidden'
      }
    },
    siderSty() {
      return {
        position: 'fixed', 
        height: '100vh', 
        left: 0, 
        top: '0', 
        // 'margin-right': '-17px',
        // overflow: 'scroll'
      }
    },
    contentSty() {
      return {
        margin: '20px', 
        background: '#fff', 
        minHeight: '260px',
        'margin-left': this.contentLeft,
        transition: 'all .2s ease-in-out',
        padding: '10px'
      }
    }
  },
  methods: {
    collapsedSider () {
    //   this.$refs.side1.toggleCollapse()
    //   if(this.isCollapsed){
    //     this.headerLeft = '0px'
    //     this.contentLeft = '0px'
    //   }else {
    //     this.headerLeft = '200px'
    //     this.contentLeft = '220px'
    // }
    },
    handleLogout() {
      removeCookie('token')
      this.$router.push({path: '/login'})

    },
    handleDropClick(name) {
      if(name === 'logout') this.handleLogout()
    }
  }
}
</script>

<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout_content {
  min-height: auto !important;
}
// .qutan_logo_box {
//   width: 200px;
//   height: 64px;
//   position: fixed;
//   top: 0;
//   left: 0;
// }
// .qutan_logo {
//   display: block;
//   width: 100%;
//   height: 100%;
// }
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    // overflow: hidden;
    overflow: scroll;
}
.header_item {
  display: inline-flex;
  position: absolute;
  right: 25px;
  height: 64px;
  align-items: center;
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.sider {
  overflow-x: hidden !important;
}
.sider_box {
  // width: 200px;
  overflow: hidden;
}

</style>
