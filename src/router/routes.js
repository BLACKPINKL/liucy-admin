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
            path: 'edit/:id',
            component: () => import('pages/product/brand/edit'),
            name: 'product_brand_edit',
            meta: {
              title: '编辑品牌',
              icon: 'ios-search',
              noCache: true,
              hidden: true
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
        },
        children: [
          {
            path: 'add',
            component: () => import('pages/product/category/add'),
            name: 'product_category_add',
            meta: {
              title: '添加分类',
              icon: 'ios-search',
              noCache: true
            },
          },
          {
            path: 'edit/:id',
            component: () => import('pages/product/category/edit'),
            name: 'product_category_edit',
            meta: {
              title: '编辑分类',
              icon: 'ios-search',
              noCache: true,
              hidden: true
            },
          },
          {
            path: 'list',
            component: () => import('pages/product/category/list'),
            name: 'product_category_list',
            meta: {
              title: '分类列表',
              icon: 'ios-search',
              noCache: true
            },
          },
        ]


      },
      {
        path: 'type',
        component: () => import('pages/product/type'),
        name: 'product_type',
        meta: {
          title: '类型管理',
          icon: 'md-flame',
          noCache: true
        },
        children: [
          {
            path: 'add',
            component: () => import('pages/product/type/add'),
            name: 'product_type_add',
            meta: {
              title: '添加类型',
              icon: 'ios-search',
              noCache: true
            },
          },
          {
            path: 'edit/:id',
            component: () => import('pages/product/type/edit'),
            name: 'product_type_edit',
            meta: {
              title: '编辑类型',
              icon: 'ios-search',
              noCache: true,
              hidden: true
            },
          },
          {
            path: 'list',
            component: () => import('pages/product/type/list'),
            name: 'product_type_list',
            meta: {
              title: '类型列表',
              icon: 'ios-search',
              noCache: true
            },
          },
        ]


      },
      {
        path: 'attr',
        component: () => import('pages/product/attr'),
        name: 'product_attr',
        meta: {
          title: '属性管理',
          icon: 'md-flame',
          noCache: true
        },
        children: [
          {
            path: 'add',
            component: () => import('pages/product/attr/add'),
            name: 'product_attr_add',
            meta: {
              title: '添加属性',
              icon: 'ios-search',
              noCache: true
            },
          },
          {
            path: 'edit/:id',
            component: () => import('pages/product/attr/edit'),
            name: 'product_attr_edit',
            meta: {
              title: '编辑属性',
              icon: 'ios-search',
              noCache: true,
              hidden: true
            },
          },
          {
            path: 'list',
            component: () => import('pages/product/attr/list'),
            name: 'product_attr_list',
            meta: {
              title: '属性列表',
              icon: 'ios-search',
              noCache: true
            },
          },
        ]


      },
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: {
      title: '文章模块',
      icon: 'ios-stats-outline',
    },
    name: 'article',
    children: [
      {
        path: 'add_cate',
        component: () => import('pages/article/cateAdd'),
        name: 'article_add_cate',
        meta: {
          title: '添加分类',
          icon: 'ios-search',
          noCache: true
        }
      },
      {
        path: 'edit_cate/:id',
        component: () => import('pages/article/cateEdit'),
        name: 'article_edit_cate',
        meta: {
          title: '编辑分类',
          icon: 'ios-search',
          noCache: true,
          hidden: true
        }
      },
      {
        path: 'cate_module',
        component: () => import('pages/article/cateModule'),
        name: 'cate_module',
        meta: {
          title: '分类管理',
          icon: 'ios-search',
          noCache: true
        }
      },
      {
        path: 'add_article',
        component: () => import('pages/article/articleAdd'),
        name: 'add_article',
        meta: {
          title: '添加文章',
          icon: 'ios-search',
          noCache: true
        }
      },
      {
        path: 'edit_article',
        component: () => import('pages/article/articleEdit'),
        name: 'edit_article',
        meta: {
          title: '编辑文章',
          icon: 'ios-search',
          noCache: true,
          hidden: true
        }
      },
      {
        path: 'module_article',
        component: () => import('pages/article/articleList'),
        name: 'add_article',
        meta: {
          title: '文章管理',
          icon: 'ios-search',
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

  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试页',
      icon: 'ios-stats-outline',
    },
    name: 'test',
    children: [
      {
        path: 'index',
        component: () => import('pages/test'),
        name: 'test_index',
        meta: {
          title: '测试页',
          icon: 'ios-search',
          noCache: true
        }
      },
      
    ]
  },
]


