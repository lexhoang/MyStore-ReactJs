import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArqJO9fuI2QQ0LjHwS7v2Ot9BXlP0MJxM",
    authDomain: "vape-store-999.firebaseapp.com",
    projectId: "vape-store-999",
    storageBucket: "vape-store-999.appspot.com",
    messagingSenderId: "540576607364",
    appId: "1:540576607364:web:2d82946bb14ffb9908e6d1",
    measurementId: "G-PD9NC3PKMY"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();