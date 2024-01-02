import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return {
      deviceList: []
    }
  },
  modules: {
    app,
    settings,
    permission,
    user
  },
  getters,
  mutations: {
    setDeviceList(state,list) {
      state.deviceList = list
    }
  }
})

export default store
