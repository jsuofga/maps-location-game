<template>
  <div class="welcome d-flex flex-column justify-space-around align-center">
    <div id='octava'><img src="../assets/octava-logo-white.png" width = "100 px" alt=""> </div>

    <h1 id="title"><span id='explorer'>Play</span> . <span id='discover'>Explore</span> . <span id='play'>Discover</span> </h1>

    <v-btn v-if = "!loginGame" @click= "logIn" x-large rounded color= 'cyan accent-3 white--text'>Enter to Play</v-btn>

    <div v-if = "loginGame">

      <div v-if= "showRegister">
         <Register
            @message-showRegister = "update_showRegister"
         
         />
      </div>
       <div v-else>
         <LogIn
          @message-showRegister = "update_showRegister"
          @message-loggedIn= "update_loggedIn"
          
          />
       </div>
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
      loginGame:false,
      showRegister:false

    }),
    methods: {
       update_showRegister(_payload){
         this.showRegister = _payload

       },
       update_loggedIn(_payload){
         this.$emit('message-showLogOut',true)
       },
       logIn(){
         this.loginGame = true
       },
    },  

    mounted(){

    }
  }

</script>

<style scoped >
 .welcome{
   position:relative;
   opacity: .8;
   background-image: url("../assets/background.jpg"); 
   background-size: cover;
   height:100vh
 }
 #title{
  font-size:4rem;
  color:white;
   
 }
 #explorer{
  color:white
 }
  #discover{
  color: black
 }
  #play{
  color: white
 }
#octava{
position:absolute;
top:10px;
left:10px;

}


</style>
