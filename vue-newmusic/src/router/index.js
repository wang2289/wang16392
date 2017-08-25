import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '@/components/MusicList/MusicList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: MusicList
    }
  ]
})
