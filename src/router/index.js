import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes 固定路径
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // {
  //   path: '/',
  //   components: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: '首页',
  //     components: () => import('@/views/dashboard/index'),
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/',
  //   components: Layout,
  //   redirect: '/profile',
  //   name: '个人信息',
  //   meta: { title: '', icon: 'el-icon-postcard' },
  //   children: [
  //     {
  //       path: 'profile',
  //       components: () => import('@/views/profile/index'),
  //       meta: { title: '个人信息', icon: 'el-icon-postcard' }
  //     }
  //   ]
  // }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes 动态分配路由
 * the routes that need to be dynamically loaded based on user roles
 */
export let asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: '首页',
  //       component: () => import('@/views/main-page/homePage/index'),
  //       meta: { title: '首页', icon: 'el-icon-message' }
  //     }
  //   ]
  // },
  {
    path: '/equipment-resume',
    component: Layout,
    redirect: '/resumeView',
    name: '设备履历',
    meta: { title: '设备履历', icon: 'check', permissions: ['admin', 'qcc'] },
    children: [
      {
        path: 'resumeView',
        component: () => import('@/views/equipment-resume/resumeView'),
        meta: { title: '履历查看', icon: 'el-icon-user', permissions: ['admin', 'qcc'] }
      }
    ]
  },

  {
    path: '/inspection-task-manager',
    component: Layout,
    redirect: '/taskExecution',
    name: '设备巡检',
    meta: { title: '设备巡检', icon: 'check', permissions: ['admin', 'qcc'] },
    children: [
      {
        path: 'taskExecution',
        component: () => import('@/views/inspection-task-manager/taskExecution'),
        meta: { title: '任务执行', icon: 'el-icon-user', permissions: ['admin', 'qcc'] }
      },
      {
        path: 'exceptionHandle',
        component: () => import('@/views/inspection-task-manager/exceptionHandle'),
        meta: { title: '异常处理', icon: 'el-icon-user', permissions: ['admin', 'qcc'] }
      },
      {
        path: 'inspectRecord',
        component: () => import('@/views/inspection-task-manager/inspectRecord'),
        meta: { title: '巡检记录', icon: 'el-icon-user', permissions: ['admin', 'qcc'] }
      }
    ]
  },

  // {
  //   path: '/device-status',
  //   component: Layout,
  //   redirect: '/device-status/unitConfiguration',
  //   name: '设备状态',
  //   meta: { title: '设备状态', icon: 'el-icon-postcard', permissions: ['admin', 'qcc'] },
  //   // children: [
  //   //   {
  //   //     path: 'unitConfiguration',
  //   //     component: () => import('@/views/device-status/unitConfiguration'),
  //   //     meta: { title: '运维单位配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
  //   //   },
  //   //   {
  //   //     path: 'patrolTaskConfiguration',
  //   //     component: () => import('@/views/device-status/patrolTaskConfiguration'),
  //   //     meta: { title: '巡检任务配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
  //   //   }
  //   // ]
  // },
  {
    path: '/accredit-manager',
    component: Layout,
    redirect: '/accredit-manager/supplierAccount',
    name: '配置',
    meta: { title: '配置', icon: 'accredit', permissions: ['admin', 'qcc'] },
    children: [
      // {
      //   path: 'unitConfiguration',
      //   component: () => import('@/views/device-status/unitConfiguration'),
      //   meta: { title: '运维单位配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
      // },
      {
        path: 'patrolTaskConfiguration',
        component: () => import('@/views/device-status/patrolTaskConfiguration'),
        meta: { title: '巡检任务配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
      },
      // {
      //   path: 'qrAccreditSupplier',
      //   component: () => import('@/views/device-status/unitConfiguration'),
      //   meta: { title: '设置配置', icon: 'el-icon-s-unfold', permissions: ['admin', 'qcc'] }
      // }
    ]
  },

  // {
  //   path: '/supplier-employee-manager',
  //   component: Layout,
  //   redirect: '/supplier-employee-manager/supplierEmployee',
  //   name: '设置',
  //   meta: { title: '设置', icon: 'employee', permissions: ['admin', 'supplier'] },
  //   // children: [
  //   //   {
  //   //     path: 'unitConfiguration',
  //   //     component: () => import('@/views/device-status/unitConfiguration'),
  //   //     meta: { title: '运维单位配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
  //   //   },
  //   //   {
  //   //     path: 'patrolTaskConfiguration',
  //   //     component: () => import('@/views/device-status/patrolTaskConfiguration'),
  //   //     meta: { title: '巡检任务配置', icon: 'el-icon-s-fold', permissions: ['admin', 'qcc'] }
  //   //   }
  //   // ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 移动端路由
var routeM = [
  {
    path: '/',
    component: Layout,
    redirect: '/inspectionEquipment',
    children: [
      {
        path: '/inspectionEquipment',
        name: 'inspectionEquipment',
        component: () => import('@/views/mobileInspection/inspectionEquipment'),
        meta: { title: '巡检设备', icon: 'el-icon-message' }
      }
    ]
  },
  {
    path: '/mobileInspection',
    component: Layout,
    redirect: '/inspectionContent',
    name: '巡检内容',
    meta: { title: '巡检内容', icon: 'check', permissions: ['admin', 'qcc'] },
    children: [
      {
        path: '/mobileInspection/inspectionContent',
        name: 'inspectionContent',
        component: () => import('@/views/mobileInspection/inspectionContent'),
        meta: { title: '巡检内容', icon: 'el-icon-user', permissions: ['admin', 'qcc'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // 处理移动端的业务逻辑
      asyncRoutes = routeM
      next()
    } else {
    // 处理电脑端的业务逻辑
      next()
    }
  }
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
