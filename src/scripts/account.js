import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc, deleteDoc, Timestamp, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
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
            getDoc(doc(db, 'takenNames', newUsername)).then(checkUsername => {
              
            // if username is taken
              if (checkUsername.exists()) {
                alert('Username is taken, please chose a new one.');
              } else {

                getDoc(doc(db, 'takenNames', username)).then(checkDate => {
                  let dateData = checkDate.data();
                  let updatedDate = dateData.changedAt.toDate();
                  let currentDate = Timestamp.now()
                  let jsCurrentDate = currentDate.toDate()

                  if (jsCurrentDate.getDate() >= updatedDate.getDate() + 14) {
                    setDoc(doc(db, 'users', user.uid), {
                      username: newUsername,
                    }). then(() => {
                      setDoc(doc(db, 'takenNames', newUsername), {
                        uid: user.uid,
                        changedAt: jsCurrentDate
                      }). then(() => {
                        deleteDoc(doc(db, 'takenNames', username));
                      }). then(() => {
                        infoForm.reset();
                        window.location.reload();
                      }). then(() => {
                        const docRef = addDoc(collection(db, 'emailSent'), {
                          to: user.email,
                          message: {
                            subject: 'LasTag Username Updated',
                            text: 'Your LasTag username was just updated, if you did not do this, change your password immediately.'
                          }
                        }). then(() => {
                          console.log('Email sent with id' + docRef.id);
                        })
                      })
                    })
                  } else {
                    alert(`You can only change your username once every 14 days, please wait until ${updatedDate.getMonth() + 1}/${updatedDate.getDate() + 14}/${updatedDate.getFullYear()}`)
                  }
                }) 
              }
            })
          }

          addDoc(doc(db, 'emailSent'), { // Send email
            to: user.email,
            message: {
              subject: 'LasTag Username Updated',
              text: 'Your LasTag username was just updated, if you did not do this, change your password immediately.'
            }
          }). then(() => {
            console.log('Queued Email')
          })

        })

      })
    }
})