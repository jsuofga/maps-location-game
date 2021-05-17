<template>

    <nav>
        <v-app-bar app flat >
            <v-app-bar-nav-icon text  @click = "leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
             <v-toolbar-title class = 'font-weight-black '>Where Am I</v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn  depressed v-bind="attrs" v-on="on">
                        <v-icon>mdi-chevron-down</v-icon>Menu
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" router-link :to= "item.link">
                        <v-list-item-title >{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->

            <v-btn depressed text >
                <v-icon class = "left">mdi-export</v-icon>sign in
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
        test: function() {
            this.dialog = true
        },
    }

}

</script>

<style scoped>

</style>