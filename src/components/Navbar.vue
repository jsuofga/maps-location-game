<template>

    <nav>
        <v-app-bar app flat >
            <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon>

             <v-toolbar-title class = 'font-weight-black '>Jeff's Geography Quiz (play the real thing at GeoGussr)</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar>
            <img
                src= "@/assets/soupensu.jpg"
            >
            </v-avatar>

            <v-btn depressed text @click= "gotoLogIn" >
                <v-icon  class = "left">mdi-export</v-icon>log in
            </v-btn>

                             
        </v-app-bar>



    </nav>
</template>

<script>


export default {
    components: {
            
    },
    data: () => ({
        


    }),
    methods: {
        gotoLogIn: function() {
            this.$router.push({name:'LogIn'})
       
        },
    }

}

</script>

<style scoped>

</style>