import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(userType, route) {
  if (route.meta && route.meta.permissions) {
    return route.meta.permissions.includes(userType)
  } else {
    return true
  }
}

/**
 * 通过递归过滤路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, userType) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(userType, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, userType)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userType) {
    return new Promise(resolve => {
      var accessedRoutes = filterAsyncRoutes(asyncRoutes, userType)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
