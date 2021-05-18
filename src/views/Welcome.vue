<template>
  <div class="welcome d-flex flex-column justify-center align-center">
      <h1 class = "mb-10">Welcome</h1>
      <h5 class = "mb-10">Please Sign In First</h5>

  </div>
</template>

<script>
  import Gameover from '@/views/Welcome'

  export default {
    name: 'Welcome',

    components: {
      Gameover,
    
    },
    props:[],

    data: () => ({

    }),
    methods: {
       
    },  

    mounted(){

    }
  }

</script>

<style scoped>
 .welcome{
   /* border:1px solid red; */
 
   height:90vh
 }
 


</style>
