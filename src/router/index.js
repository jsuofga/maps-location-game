import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gameover from '../views/Gameover.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gameover',
    name: 'Gameover',
    component: Gameover
  },

]

const router = new VueRouter({
  routes
})

export default router
