import Layout from 'pages/index/index.vue'
import Brand from 'pages/product/brand'
import err404 from 'pages/404'

// 公共权限 
export const constantsRoutes =  [
  {
    path: '/login',
    hidden: true,
    component: () => import('pages/login')
  },
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
        redirect: 'product/brand/add',
        component: Brand,
        name: 'product_brand',
        meta: {
          title: '品牌管理',
          icon: 'ios-search',
          noCache: true
        },
        children: [
          {
            path: 'add',
            component: () => import('pages/product/brand/add'),
            name: 'product_brand_add',
            meta: {
              title: '添加品牌',
              icon: 'ios-search',
              noCache: true
            },
          },
          {
            path: 'list',
            component: () => import('pages/product/brand/list'),
            name: 'product_brand_list',
            meta: {
              title: '品牌列表',
              icon: 'ios-search',
              noCache: true
            },
          },
        ]
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
        path: 'add_form',
        component: () => import('pages/devlop/form/add'),
        name: 'devlop_add_form',
        meta: {
          title: '添加表单',
          icon: 'ios-search',
          noCache: true
        }
      },
      {
        path: 'get_form',
        component: () => import('pages/devlop/form/get'),
        name: 'devlop_get_form',
        meta: {
          title: '表单管理',
          icon: 'ios-search',
          noCache: true
        }
      },
    ]
  },
  
]


