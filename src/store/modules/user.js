import { login, logout, getInfo, getPermissions } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: '',
    type: '',
    permissions: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.result.token)
        setToken(data.result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginMock({ commit }, userInfo) {
    const { username, password } = userInfo
    commit('SET_TOKEN', "TempToken")
    setToken("TempToken")
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败, 请重新登录！')
        }
        const { name, avatar } = data.result
        if (avatar === null || avatar === '') {
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        } else {
          commit('SET_AVATAR', avatar)
        }
        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_USERINFO', data.result)
        if (data.result.type === 0) {
          commit('SET_TYPE', 'admin')
        } if (data.result.type === 1) {
          commit('SET_TYPE', 'qcc')
        } else if (data.result.type === 2) {
          commit('SET_TYPE', 'qr')
        } else if (data.result.type === 3) {
          commit('SET_TYPE', 'supplier')
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfoMock({ commit, state }) {
    commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    commit('SET_NAME', "张三")
    // commit('SET_AVATAR', avatar)
    commit('SET_USERINFO', "")
    commit('SET_TYPE', 'admin')

    return ""
  },

  // 获取用户权限集合
  getPermissions({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPermissions().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败, 请重新登录！')
        }

        const permissions = data.result

        commit('SET_PERMISSIONS', permissions)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

