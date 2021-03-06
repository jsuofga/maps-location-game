import Vue from 'vue'
import VueRouter from 'vue-router'
import Play from '../views/Play.vue'
import Gameover from '../views/Gameover.vue'
import Welcome from '../views/Welcome.vue'
import {projectAuth} from '../firebase/config'


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
    component: Gameover,
    
  },
  {
    path: '/play',
    name: 'Play',
    component: Play,
    meta:{
      requiresAuth:true
    }
  },


]



const router = new VueRouter({
  routes
})

//Nav Guards
router.beforeEach((to,from,next)=> {

  //Check for requireAuth guard
    if(to.matched.some(record => record.meta.requiresAuth)){
      //console.log('currentUser ',projectAuth.currentUser)
      //Check if NOT logged in
      if(!projectAuth.currentUser){
        //Not Authenticated.

        //Goback to Welcome page to Log In again
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      }else{
        //Authenticated.
        console.log('email is',projectAuth.currentUser.email)
        //  Proceed to route
        next()
      }
    }else{
      next()
    }

})

export default router
