<template>
  <v-app>

    <v-main class = "grey lighten-3" >
    
      <router-view
        @message-score= "updateScore"
        v-bind:score= "score"
        @message-showLogOut= "update_showLogOut"

    >

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
      Navbar,
      
  },

  data: () => ({
    //
    score: 0,
    loggedIn: false

  }),

  methods:{
    updateScore(payload){
      console.log('score is:', payload)
      this.score = payload
    },
    update_showLogOut(payload){
    
      this.loggedIn= true
    }

  },
  mount(){

  }
};
</script>

<style >
  html{
      overflow-y: hidden;  /*removes the vertical scroll bars from app */
    }
</style>
