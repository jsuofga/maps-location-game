<template>
  <div class="game-over d-flex flex-column justify-center align-center">
      <h1 class = "mb-10">Game Over</h1>
      <h5 class = "mb-10">Your Score is {{score}}</h5>
      <v-btn @click= "playAgain" class = "mt-10" color = 'green white--text'>Play Again</v-btn>
  </div>
</template>

<script>
  import Gameover from '@/views/Gameover'

  export default {
    name: 'Gameover',

    components: {
      Gameover,
    
    },
    props:['score'],

    data: () => ({

    }),
    methods: {
        playAgain(){
            this.$router.push({name:'Home'})
        }
    },  

    mounted(){

    }
  }

</script>

<style scoped>
 .game-over{
   /* border:1px solid red; */
 
   height:90vh
 }
 


</style>
