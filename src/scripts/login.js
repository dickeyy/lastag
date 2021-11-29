import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const auth = getAuth();

// Sign in User
const signinForm = document.querySelector('#sign-in-form');
signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signinForm['email'].value;
  const password = signinForm['password'].value

  signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      console.log(error.code);
      if (error.code == 'auth/wrong-password') {
        alert('Password is incorrect')
      } else if (error.code == 'auth/user-not-found') {
        alert('No user with that email was found, please sign up.')
      } else {
        alert(error.message)
      }
    })
})

// Detedct auth state
onAuthStateChanged(auth, user => {
  if(user != null) {
    window.location.replace('account.html')
  }
})