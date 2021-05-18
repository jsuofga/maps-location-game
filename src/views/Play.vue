<template>
  <div class="play">
      <div id = "guess-location" class = ' d-flex justify-center'> 1. Where is this?</div>
      <div id = "score-board" class = ' d-flex justify-center'>{{ counter}}/10 Your Score {{score}} </div>
      <v-btn id="goto-place" @click= "gotoPlace"><v-icon left class = "mx-5">mdi-airplane-takeoff</v-icon> Goto Next Place</v-btn>
      <div id= "hideMyAss"></div>
   
      <div id="streetMap" ref = "streetMap" class= "play d-flex justify-center" >  
            <!-- <h5>Street Map</h5> -->
      </div>
      
      <div id = "pick-location" class = ' d-flex justify-center'> 2. Pick Location On Map</div>

      <!-- <v-btn id = "btn-guess" @click= "submit" color = " purple accent-3 white--text"><v-icon>mdi-cursor-pointer</v-icon> Submit my guess</v-btn> -->
      <div id="map" ref = "map" class= "home d-flex justify-center"  >  
        <!-- <h5>Map</h5> -->
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
        timeout= "-1"
      >
        {{ `You are ${this.havershine()}-miles away! ${this.message}`  }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            outlined
            border="5px"
            text
            v-bind="attrs"
            @click= "closeSnackBar"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    
  </div>


</template>

<script>
  import Play from '@/views/Play'
  import PlacesData from '@/components/PlacesData'

  export default {
    name: 'Play',

    components: {
      Play,
    
    },
    data: () => ({
      map: null , //declare map object
      mapCenter:{ lat: 0, lng: 0 },  // default world centered
      streetMap: null,  // declare map for panorama map view
      streetMapCenter: { lat: 0, lng: 0 },//for streetview
      playerGuess:{lat: '', lng: '' }, // this is where on the map the player clicked. save as player guess
      dialog:false,
      snackbar:false,
      message:'',  // Snack Bar Message 
      score: 0,  // Player Score
      places: PlacesData,
      counter: 1, // Counter Number of Places shown
    }),
    methods: {
      initMapToCenter(){
          this.map = new google.maps.Map(this.$refs.map, {
          center: this.mapCenter,
          zoom: 1,
          minZoom:1,
        });
      },
      addMapClickEvent(){
          // Add click event to google map 
            google.maps.event.addListener(this.map, 'click', e => {
            this.playerGuess = {lat: e.latLng.lat(),lng:e.latLng.lng() }
            this.dialog = true
          })
      },

      gotoPlace(){
        
        let randomPlace =  Math.floor(Math.random() * 9999 );  //pick a random place from any 10,000
        console.log(this.places[randomPlace].Latitude)
        console.log(this.places[randomPlace].Longitude)
        this.streetMapCenter.lat = parseFloat(this.places[randomPlace].Latitude)
        this.streetMapCenter.lng = parseFloat(this.places[randomPlace].Longitude)
        // this.streetMapCenter.lat = parseFloat(this.places[5002].Latitude)
        // this.streetMapCenter.lng = parseFloat(this.places[5002].Longitude)
        console.log(this.streetMapCenter)

        this.streetMap = new google.maps.StreetViewPanorama(this.$refs.streetMap, {
         position: this.streetMapCenter,
         pov: {heading: 165, pitch: 0},
         motionTracking: false,
         fullscreenControl: false
       
        });
      },
        submit(_submitAnswer){

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
                this.addMapClickEvent()// Add click event to google map 
                this.points() // Show Message
                this.counter += 1
             
            }

        },

        closeSnackBar(){
          this.snackbar = false //Close Snack Bar
          this.initMapToCenter() //Center Map to Lat = 0, Long = 0
          this.addMapClickEvent() // Add click event to google map 
          this.gameStatus() //Check Game Status

        },
        // Havershine Formula to calculate distances between (Longitude1, Latitude1) and (Longitude2, Latitude2)
        havershine(){
            const R = 3958.8; // Radius of the Earth in miles
            let rlat1 = this.playerGuess.lat * (Math.PI/180); // Convert degrees to radians
            let rlat2 = this.streetMapCenter.lat * (Math.PI/180); // Convert degrees to radians 
            let difflat = rlat2-rlat1; // Radian difference (latitudes)
            let difflon = (this.streetMapCenter.lng-this.playerGuess.lng) * (Math.PI/180); // Radian difference (longitudes)
            let d =2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))) ;
            return Math.round(d);  //Send answer in miles , no decimals
        },
        // Points and Message
        points(){
          console.log(this.havershine())
            if(this.havershine() > 3000) {
              this.message = "You on wrong continent bud"
              this.score -=  1000
            }else if(this.havershine() > 2000 && this.havershine()< 3000){
              this.message = "You are way off!"
              this.score -= 500
            }else if(this.havershine() > 1000 && this.havershine()< 2000){
               this.message = "Not Even Close"
               this.score -= 250
            }else if(this.havershine() > 500 && this.havershine()< 1000){
               this.message = "Close"
               this.score +=  0
            }else if(this.havershine() > 250 && this.havershine()< 500){
               this.message = "Getting Hot"
               this.score += 250
            }else if(this.havershine() > 100 && this.havershine()< 250){
               this.message = "Close, but no cigars"
               this.score += 500
            }else if(this.havershine() > 50 && this.havershine()< 100){
               this.message = "You are close!"
               this.score += 1000
            }else if(this.havershine() > 25 && this.havershine()< 50){
               this.message = "You are Good!"
               this.score +=  2000
            }else if(this.havershine() > 10 && this.havershine()< 25){
               this.message = "Genius"
               this.score +=3000
           }else if(this.havershine() < 10){
               this.message = "BullsEye"
               this.score += 5000
            }
      }, 

      gameStatus(){
        if(this.counter == 10){
          this.$emit('message-score',this.score)
          this.$router.push({name:'Gameover'})
        }else{
            //Do nothing
        }
      }
    },  

    created(){
       let externalScript = document.createElement('script')
       externalScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNpcYO8K0hZY3T4xzYXlNP5ZKyjblb73I')
       document.head.appendChild(externalScript)
    },

    mounted(){
      setTimeout(this.initMapToCenter,200)
      setTimeout(this.gotoPlace,400)
      setTimeout(this.addMapClickEvent,600)

    }
  }

</script>

<style scoped>
 .play{
   /* border:1px solid red; */
   position:relative; 
   height:90vh
 }
 #hideMyAss{
   position:absolute;
   background-image: url("../assets/hide-location.png");
   z-index:250; 
   top:0px;
   left:0px;
   width: 250px;
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
 #goto-place{
   z-index:1000;
   position:fixed;
   color:white;
   top: 50%;
   right:0%;
   height: 10vh;
   background-color: orange;
 }
 #pick-location{
   background-color:magenta;
   color:white;
   width:480px;
   position:fixed;
   top: 65%;
   left:0%;
   z-index:5000;
 }
  #guess-location{
   background-color:magenta;
   color:white;
   width:240px;
   position:fixed;
   top: 10%;
   left:45%;
   z-index:5000;
 }
   #score-board{
   background-color: white;
   color:black;
   width:250px;
   position:fixed;
   top: 145px;
   left:0%;
   z-index:5000;
 }


</style>
