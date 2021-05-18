import Vue from 'vue'
import VueRouter from 'vue-router'
import Play from '../views/Play.vue'
import Gameover from '../views/Gameover.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/gameover',
    name: 'Gameover',
    component: Gameover
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },

]

const router = new VueRouter({
  routes
})

export default router
