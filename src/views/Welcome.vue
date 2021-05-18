<template>
  <div class="welcome d-flex flex-column justify-center align-center">

      <div v-if= "showSignUp">
         <SignUp/>
      </div>
       <div v-else>
         <LogIn/>
       </div>
       

  </div>
</template>

<script>
  import Gameover from '@/views/Welcome'
  import SignUp from '@/components/SignUp'
  import LogIn from '@/components/LogIn'

  export default {
    name: 'Welcome',

    components: {
      Gameover,
      SignUp,
      LogIn 

    
    },
    props:[],

    data: () => ({

      showSignUp:true

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
