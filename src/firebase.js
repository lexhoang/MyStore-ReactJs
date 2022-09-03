import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjfgaEiWX_AXfYrB_lR_lJH2ICLSPqndI",
    authDomain: "watch-store-999.firebaseapp.com",
    projectId: "watch-store-999",
    storageBucket: "watch-store-999.appspot.com",
    messagingSenderId: "839341194585",
    appId: "1:839341194585:web:2c2b9bd78d4f444640e048",
    measurementId: "G-B15RMEG7KQ"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();