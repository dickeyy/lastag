import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { app } from "../main.js";

const auth = getAuth(app);
const db = getFirestore(app);
const infoForm = document.querySelector('#acct-form');

// Detedct auth state
onAuthStateChanged(auth, user => {
    if(user == null) {
      window.location.replace('login.html')
    } else {

      document.getElementById('email').innerHTML = user.email;

      getDoc(doc(db, 'users', user.uid)).then(docSnap => {
        const data = docSnap.data();
        const username = data.username
        
        document.getElementById('username-2').innerHTML = username

        infoForm.addEventListener('submit', (e) => {
          e.preventDefault();
        
          const newUsername = infoForm['username'].value;
          // check whitespace
          const containWhiteSpace = str =>
          /\s/.test(str);

          const op=containWhiteSpace(newUsername);

          if (op == true) {
            alert('Username cannot contain spaces.')
          } else {

            // Check if username is taken
            getDoc(doc(db, 'takenNames', newUsername)).then(docSnap => {
              
            // if username is taken
              if (docSnap.exists()) {
                alert('Username is taken, please chose a new one.');
              } else {
                setDoc(doc(db, 'users', user.uid), {
                  username: newUsername,
                }). then(() => {
                  setDoc(doc(db, 'takenNames', newUsername), {
                    uid: user.uid
                  }). then(() => {
                    deleteDoc(doc(db, 'takenNames', username));
                  }). then(() => {
                    infoForm.reset();
                    window.location.reload();
                  })
                })
              }
            })
          }
        })

      })
    }
})