// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyDzVKhkK7r4urtN_waMV9J1evp9BF9DdUI",
  authDomain: "lastag-efefb.firebaseapp.com",
  databaseURL: "https://lastag-efefb-default-rtdb.firebaseio.com",
  projectId: "lastag-efefb",
  storageBucket: "lastag-efefb.appspot.com",
  messagingSenderId: "645534342479",
  appId: "1:645534342479:web:9ff71b96afa0c84837b93a",
  measurementId: "G-MY66XHEZJ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth stuff
const auth = getAuth(app);

// Detedct auth state
onAuthStateChanged(auth, user => {
  if(user != null) {
    console.log('Logged In as: ' + auth.currentUser.email);
  } 
})