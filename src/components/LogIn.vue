<template>

    <div class = "log-in">
        <v-card width="480" class='mt-5'>
          <v-card-title class="headline justify-center">
            Welcome
          </v-card-title>
            <v-card-text class="d-flex justify-center ">Log In</v-card-text>
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

          <v-text-field
            v-model="password"
            :counter="10"
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
              class="ml-5 justify-center"
              @click="cancel"
            >
              Cancel
            </v-btn>
          
            <v-btn
              color="primary"
               class="ml-5 justify-center"
              @click="login"
            >
              Log In
            </v-btn>
           </div>
    
        </v-form>
        <br>

        <v-card-text class="d-flex justify-center ">No Account?  <strong @click = "gotoSignUp" id ="sign-up" class="mx-3"> Sign Up Here</strong></v-card-text>
  
  </v-card>

    </div>
    
  
  
</template>

<script>
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
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
    }),

methods:{
  
   login(){
     console.log('email is',this.email)
     console.log('username is',this.username)
    
   },
   cancel(){
      this.$router.push({name:'Welcome'})
   },
   gotoSignUp(){
     this.$router.push({name:'SignUp'})
   }

}

}
</script>

<style>
.log-in{
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:80vh;

}#sign-up{
  cursor:pointer;
  color:magenta;
  text-decoration:underline;
}

</style>