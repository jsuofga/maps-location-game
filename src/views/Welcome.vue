<template>
  <div class="welcome d-flex flex-column justify-center align-center">

      <div v-if= "showRegister">
         <Register
            @message-showRegister = "update_showRegister"
         
         />
      </div>
       <div v-else>
         <LogIn
          @message-showRegister = "update_showRegister"
          
          />
       </div>
       

  </div>
</template>

<script>
  import Gameover from '@/views/Welcome'
  import Register from '@/components/Register'
  import LogIn from '@/components/LogIn'

  export default {
    name: 'Welcome',

    components: {
      Gameover,
      Register,
      LogIn 

    
    },
    props:[],

    data: () => ({

      showRegister:false

    }),
    methods: {
       update_showRegister(_payload){
         this.showRegister = _payload

       }
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
