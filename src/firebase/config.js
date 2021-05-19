  
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDtkTVwltr4fIF_L1r3blq-HHhG5Is8vTI",
    authDomain: "geoquest-7660c.firebaseapp.com",
    projectId: "geoquest-7660c",
    storageBucket: "geoquest-7660c.appspot.com",
    messagingSenderId: "482511013316",
    appId: "1:482511013316:web:33090e083ab04011d21091"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  export {projectFirestore,projectAuth}