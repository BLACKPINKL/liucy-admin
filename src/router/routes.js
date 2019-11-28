import Layout from 'pages/index/index.vue'
import err404 from 'pages/404'

// 公共权限 
export const constantsRoutes =  [
  // {
  //   path: '/login',
  //   hidden: true,
  //   component: () => import('pages/login/login')
  // },
  {
    path: '/',
    redirect: 'product/brand',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'ios-stats-outline',
    },
    name: 'product',
    children: [
      {
        path: 'product/brand',
        component: () => import('pages/product/brand'),
        name: 'product_brand',
        meta: {
          title: '添加品牌',
          icon: 'ios-search',
          noCache: true
        }
      },
      {
        path: 'category',
        component: () => import('pages/product/category'),
        name: 'product_category',
        meta: {
          title: '分类管理',
          icon: 'md-flame',
          noCache: true
        }
      },
    ]
  },
  
  {
    path: '/devlop',
    component: Layout,
    meta: {
      title: '开发设置',
      icon: 'ios-stats-outline',
    },
    name: 'devlop',
    children: [
      {
        path: 'devlop/form',
        component: () => import('pages/devlop/form'),
        name: 'product_form',
        meta: {
          title: '添加表单',
          icon: 'ios-search',
          noCache: true
        }
      }
    ]
  },
  
]


