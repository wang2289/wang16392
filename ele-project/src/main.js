// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.config.productionTip = false
// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios)

// Vuex 进行状态管理
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    musicData: [],
    skinColor: localStorage.skinColor || '#1565C0',
    DOM: {}
  },
  actions: {
    getData ({
      commit,
      state
    }) {
       if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics)
        return
      }
      return new Promise((resolve, reject) => {
        Vue.axios.get('/api/music-data')
          .then(res => {
            if (res.data.errno === 0) {
              state.musicData = res.data.musicData
              localStorage.musics = JSON.stringify(state.musicData)
            }
          })
          .then(() => {
            commit('toggleMusic', 0)
          })
        resolve()
      })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
