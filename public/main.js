// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
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

// Page name stuff
const filePath = window.location.pathname;
const pageName = filePath.split("/").pop();
// const headBtn = document.getElementById('loginBtn')
// const headBtn2 = document.getElementById('loginBtn2')
// const headBtn3 = document.getElementById('loginBtn3')

if (pageName != "") {
  if (pageName != "contact") {
    window.location.replace('index.html')
  }
}

// Detedct auth state
onAuthStateChanged(auth, user => {
  if(user != null) {
    // headBtn.innerText = "Account"
    // headBtn2.innerText = "Account"
    // headBtn3.innerText = "Account"
  } else {
    // headBtn.innerText = "Log In"
    // headBtn2.innerText = "Log In"
    // headBtn3.innerText = "Log In"
  }
})

export const cUser = auth.currentUser