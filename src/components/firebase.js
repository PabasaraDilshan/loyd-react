import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDeM7zB4m3C_PEApoSwmsE0y_e1h1xVZBc",
    authDomain: "loyd-react.firebaseapp.com",
    databaseURL: "https://loyd-react-default-rtdb.firebaseio.com",
    projectId: "loyd-react",
    storageBucket: "loyd-react.appspot.com",
    messagingSenderId: "564445228436",
    appId: "1:564445228436:web:8a91ac08671c1a259b3381",
    measurementId: "G-B6SWHVVEKV"
  };

  firebase.initializeApp(firebaseConfig);


  export default firebase;