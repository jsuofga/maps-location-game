<template>

    <div class = "register">
        <v-card width="480" class='mt-5'>
          <v-card-title class="headline justify-center">
            Register New User
          </v-card-title>
            <!-- <v-card-text class="d-flex justify-center ">Sign Up</v-card-text> -->
          <v-divider></v-divider>
          <v-form
            ref="form"
           
            lazy-validation
          >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            label="E-mail"
            required
            outlined
            class = "ma-3"
          ></v-text-field>

          <v-card-text v-if = "error" class="d-flex justify-center red--text">{{error}}</v-card-text>
          <v-card-text v-else class ="d-flex justify-center green--text  ">{{success}}</v-card-text>

          <v-text-field
            v-model="password"
            
            :rules="nameRules"
            prepend-inner-icon="mdi-lock"
            label="password"
            required
            outlined
            class = "ma-3"
          ></v-text-field>
        
           <div class="d-flex justify-space-around ">
            <v-btn
              color="error"
              rounded
              class="ml-5 justify-center"
              @click="cancel"
            >
              Cancel
            </v-btn>
          
            <v-btn
              color="green accent-3 white--text"
              rounded
              class="ml-5 justify-center"
              @click="register"
            >
              Register
            </v-btn>
           </div>
    
        </v-form>
        <br>
  
  </v-card>

    </div>
    
  
  
</template>

<script>

import {projectAuth} from '../firebase/config'

export default {

  data: () => ({
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      password: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 12) || 'Name must be less than 12 characters',
        ],

      error:null,
      success: null
    }),

methods:{
  
   register(){
     //console.log('email is',this.email)
     //console.log('username is',this.password)

    projectAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      //console.log(user)
      this.error = null
      this.success = 'Registered!'
      setTimeout(()=>{
             this.$emit('message-showRegister', false)
      }, 3000)
  
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage )
      this.error = errorMessage
      // ..
    });
          
   },
   cancel(){
      this.email = ''
      this.password = ''
      location.reload();
    
   },


}

}
</script>

<style>
.register{
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:80vh;

}

</style>