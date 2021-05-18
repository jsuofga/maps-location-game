<template>
  <v-app>
    <Navbar/>

    <v-main class = "grey lighten-3" >
      <router-view
        @message-score= "updateScore"
        v-bind:score= "score"
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

  }),

  methods:{
    updateScore(payload){
      console.log('score is:', payload)
      this.score = payload
    }

  }
};
</script>
