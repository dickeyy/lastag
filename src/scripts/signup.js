import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { app } from "../main.js"

const auth = getAuth(app);
const db = getFirestore(app);

// signup user
const signupForm = document.querySelector('#sign-up-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    const confPassword = signupForm['confPassword'].value;
    const name = signupForm['name'].value;
    const username = signupForm['username'].value;

    const containWhiteSpace = str =>
    /\s/.test(str);

    const op=containWhiteSpace(username);

    // Check if username is taken
    getDoc(doc(db, 'takenNames', username)).then(docSnap => {

        // if username is taken
        if (docSnap.exists()) {
            alert('Username is taken, please chose a new one.');
        
        // if username isnt taken, check password
        } else {
            if (password.length < 6) {
                alert('Password must be at lease 6 characters long.')
            } else if (password != confPassword) {
                alert('Passwords do not match')
            } else if (op == true) {
                alert('Username cannot contain spaces')
            } else {
                // if all good create user
                createUserWithEmailAndPassword(auth, email, password).then(cred => {
                    return setDoc(doc(db, 'users', cred.user.uid), {
                        username: username,
                    }). then(() => {
                        return setDoc(doc(db, 'takenNames', username), {
                            uid: cred.user.uid
                        })
                    })
                }).then(() => {
                    signupForm.reset()
                    window.location.replace('account.html')
                }).catch(error => {
                    if (error.code == 'auth/email-already-in-use') {
                        alert('Email is already in use, please sign in.')
                    } else {
                        alert(error.message)
                    }
                });
            }
        }
    })
});

onAuthStateChanged(auth, user => {
    if(user != null) {
      window.location.replace('account.html')
    } 
  })