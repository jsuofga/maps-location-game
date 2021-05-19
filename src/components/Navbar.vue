<template>

    <nav>
        <v-app-bar app flat >
            <!-- <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon> -->

             <v-toolbar-title class = 'font-weight-black '>Jeff's Geography Quiz (play the real thing at GeoGussr)</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-avatar>
            <img
                src= "@/assets/soupensu.jpg"
            >
            </v-avatar> -->
            <!-- <v-text v-if= "loggedIn" >Signed in as | {{playerName}}</v-text> -->

            <v-btn v-if= "loggedIn" depressed text @click= "gotoLogIn" >
                <v-icon  class = "right">mdi-logout</v-icon>sign out
            </v-btn>
                              
                             
        </v-app-bar>



    </nav>
</template>

<script>


export default {

    props:['loggedIn'],

    components: {
            
    },
    data: () => ({
        
        playerName:'soupen su',
        // loggedIn: true

    }),
    methods: {
        gotoLogIn: function() {
            this.$router.push({name:'Welcome'})
       
        },
    }

}

</script>

<style scoped>

</style>