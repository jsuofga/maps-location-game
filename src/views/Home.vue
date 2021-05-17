<template>
  <div class="home">
      <v-btn id="test" @click= "test">Test</v-btn>
      <div id= "hideMyAss"></div>
   
      <div id="streetMap" ref = "streetMap" class= "home d-flex justify-center" >  
            <h5>Street Map</h5>
      </div>
      
      <!-- <v-btn id = "btn-guess" @click= "submit" color = " purple accent-3 white--text"><v-icon>mdi-cursor-pointer</v-icon> Submit my guess</v-btn> -->
      <div id="map" ref = "map" class= "home d-flex justify-center"  >  
        <h5>Map</h5>
      </div>   


      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Submit Your Answer ?
          </v-card-title>
  
          <v-card-text>
           Latitude= {{playerGuess.lat}}, Longitude= {{playerGuess.lng}}
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="submit('no')"
            >
              NOPE
            </v-btn>
  
            <v-btn
              color="green darken-1"
              text
              @click="submit('yes')"
            >
              Yes, I'm sure
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   
      
  <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
        centered
        color="success"
        height ="200px"
      >
        {{ `You are ${this.havershine()}-miles away!`  }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            outlined
            border="5px"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    
  </div>


</template>

<script>
  import Home from '@/views/Home'
  import PlacesData from '@/components/PlacesData'

  export default {
    name: 'Home',

    components: {
      Home,
    
    },
    data: () => ({
      map: null , //declare map object
      mapCenter:{ lat: 0, lng: 0 },  // default world centered
      streetMap: null,  // declare map for panorama map view
      streetMapCenter: {lat:40.679855,lng:-74.089859},//for streetview
      playerGuess:{lat: '', lng: '' }, // this is where on the map the player clicked. save as player guess
      dialog:false,
      snackbar:false,
      places: PlacesData,
    }),
    methods: {
      test(){
        console.log('test', this.places[1])
        let randomPlace =  Math.floor(Math.random() * 100);  
        this.streetMapCenter.lat = parseFloat(this.places[randomPlace].Latitude)
        this.streetMapCenter.lng = parseFloat(this.places[randomPlace].Longitude)
        console.log(this.streetMapCenter)

        this.streetMap = new google.maps.StreetViewPanorama(this.$refs.streetMap, {
         position: this.streetMapCenter,
         //postition: {lat:this.places[0].Latitude,lng:this.places[0].Longitude},
     
         pov: {heading: 165, pitch: 0},
         motionTracking: false,
         fullscreenControl: false
       
        });
      },
        submit(_submitAnswer){
            //console.log('guess is', this.playerGuess)
            //alert(`${this.havershine()}-miles`)
            if(_submitAnswer == 'no'){
                this.snackbar = false
                this.dialog = false
            }else if(_submitAnswer == 'yes'){
                this.snackbar = true
                this.dialog = false
                //Update Map with answer showing location of the Street View
                this.map = new google.maps.Map(this.$refs.map, {
                   center: this.streetMapCenter,
               
                  zoom: 8,
                });

              // Set a marker on map to show the answer
               let marker = new google.maps.Marker({
                  position: this.streetMapCenter,
                  title:"This is the answer!"
              });
                
                marker.setMap(this.map)
            }
          
        },
        // Havershine Formula to calculate distances between (Longitude1, Latitude1) and (Longitude2, Latitude2)
        //  
        havershine(){
            const R = 3958.8; // Radius of the Earth in miles
            let rlat1 = this.playerGuess.lat * (Math.PI/180); // Convert degrees to radians
            let rlat2 = this.streetMapCenter.lat * (Math.PI/180); // Convert degrees to radians 
            let difflat = rlat2-rlat1; // Radian difference (latitudes)
            let difflon = (this.streetMapCenter.lng-this.playerGuess.lng) * (Math.PI/180); // Radian difference (longitudes)
            let d =2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))) ;
         
            return Math.round(d);  //Send answer in miles , no decimals
    
        }
    },

    mounted(){
        this.map = new google.maps.Map(this.$refs.map, {
          center: this.mapCenter,
          zoom: 1,
          minZoom:1,
        });

        this.streetMap = new google.maps.StreetViewPanorama(this.$refs.streetMap, {
         position: this.streetMapCenter,
         //postition: {lat:this.places[0].Latitude,lng:this.places[0].Longitude},
     
         pov: {heading: 165, pitch: 0},
         motionTracking: false,
         fullscreenControl: false
       
        });

      // Add click event to google map 
        google.maps.event.addListener(this.map, 'click', e => {
          this.playerGuess = {lat: e.latLng.lat(),lng:e.latLng.lng() }
          this.dialog = true
        })
  
    }
  }


</script>

<style scoped>
 .home{
   /* border:1px solid red; */
   position:relative; 
   height:90vh
 }
 #hideMyAss{
   position:absolute;
   background-image: url("../assets/hide-location.png");
   z-index:200; 
   top:0px;
   left:0px;
   width: 160px;
   height: 80px
 }
 #map{
   position:absolute;
   z-index:100; 
   bottom:0px;
   left:0px;
   width: 480px;
   height:30vh
 }
 #test{
   z-index:1000;
   position:absolute;
   top:0px;
   right: 0px;
   background-color: red;
 }


</style>
