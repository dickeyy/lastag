import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, Timestamp  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { app } from "../main.js";

// Set consts
const auth = getAuth(app)
await new Promise(r => setTimeout(r, 400)); // wait for auth to initialize
const cUser = auth.currentUser // define current user
const settings = {
    experimentalForceLongPolling: true,
} 
const db = getFirestore(app, settings);

// Stuff to get file name for page verification
const filePath = window.location.pathname;
const fileExtension = filePath.split("/").pop();
const pageName = fileExtension.split('.')[0]

// Auth system for Signup
if (pageName == 'register') { // If page is register
    if (cUser != null) { // Redirect if logged in
        window.location.replace('account.html')
    } else {

        const signUpForm = document.querySelector('#sign-up-form'); // Get form from html
        const googleProvider = new GoogleAuthProvider();
        const googleButton = document.getElementById('google-btn')

        googleButton.addEventListener('click', (e) => {
            e.preventDefault();

            const username = prompt('What do you want your username to be?')

            getDoc(doc(db, 'takenNames', username)).then(docSnap => { // Check if username is taken
                if (docSnap.exists()) { // If username is taken
                    alert('Username is taken, please try again');
                } else {
            
                    signInWithPopup(auth, googleProvider).then((result) => {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        const user = result.user;
                        
                        return setDoc(doc(db, 'users', user.uid), { // Create doc in users collection
                            username: username
                        }). then (() => { // If that works then create doc in usernames collection
                            console.log('Created doc in users')
                            return setDoc(doc(db, 'takenNames', username), {
                                uid: username,
                                changedAt: Timestamp.now().toDate()
                            }). then (() => {
                                window.location.replace('account.html')
                            })
                        })

                    }).catch((error) => {
                        console.log(error)
                    })
                }
            })
        })

        signUpForm.addEventListener('submit', (e) => { // Runs on form submit
            e.preventDefault();

            // Get entered info
            const email = signUpForm['email'].value;
            const password = signUpForm['password'].value;
            const confPassword = signUpForm['confPassword'].value
            const name = signUpForm['name'].value;
            const username = signUpForm['username'].value;

            // Whitespace checker
            const containWhiteSpace = str =>
            /\s/.test(str);

            const whitespaceUsername = containWhiteSpace(username); // Check username whitespace
            const whitespacePassword = containWhiteSpace(password); // Check password whitespace

            // Start verification / create user
            getDoc(doc(db, 'takenNames', username)).then(docSnap => { // Check if username is taken
                if (docSnap.exists()) { // If username is taken
                    alert('Username is taken, please choose a new one');
                } else { // If userrname isnt taken
                    if (password.length < 6) { // If password is too short
                        alert('Password must be at least 6 characters long');
                    } else if (password != confPassword) { // If passwords do not match
                        alert('Passwords do not match')
                    } else if (whitespaceUsername == true) { // If username has whitespace
                        alert('Username can not contain spaces');
                    } else if (whitespacePassword == true) { // If password has whitespace
                        alert('Password can not contain spaces');
                    } else { // If everthing is all good
                        createUserWithEmailAndPassword(auth, email, password).then(cred => { // Create user
                            console.log('Created User')
                            return setDoc(doc(db, 'users', cred.user.uid), { // Create doc in users collection
                                username: username,
                            }). then (() => { // If that works then create doc in usernames collection
                                console.log('Created doc in users')
                                return setDoc(doc(db, 'takenNames', username), {
                                    uid: cred.user.uid,
                                    changedAt: Timestamp.now().toDate()
                                })
                            })
                        }). then(() => { // If that works then reset form and redirect
                            signUpForm.reset()
                            window.location.replace('account.html')
                        }). catch(error => { // Catch errors and report
                            if (error.code == 'auth/email-already-in-use') { // If user already exists
                                alert('Email is already in use, please sign in')
                            } else { // If its something else 
                                alert(error.message)
                            }
                        })
                    }
                }
            })
        })
    }
}

// Auth system for Log In
if (pageName == 'login') { // If page is login
    if (cUser != null) { // Redirect if logged in
        window.location.replace('account.html')
    } else {

        const googleProvider = new GoogleAuthProvider();
        const googleButton = document.getElementById('google-btn')

        googleButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            signInWithPopup(auth, googleProvider).then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                
                window.location.replace('account.html')
            }).catch((error) => {
                console.log(error)
            })
        })

        const signinForm = document.querySelector('#sign-in-form'); // Get html form

        signinForm.addEventListener('submit', (e) => { // runs when form is submitted
            e.preventDefault(); // prevents page from being reloaded

            // Get users inputs
            const email = signinForm['email'].value;
            const password = signinForm['password'].value;

            // Attempt to sign in
            signInWithEmailAndPassword(auth, email, password).then(() => {
                window.location.replace('account.html')
            }).catch(error => { // Alert if errors
                    if (error.code == 'auth/wrong-password') { // If password is wrong
                        alert('Password is incorrect')
                    } else if (error.code == 'auth/user-not-found') { // If user isnt found
                        alert('No user with that email was found')
                    } else { // Anything else
                        alert(error.message)
                    }
                })
                
        })
    }
    
}

// Auth system for sign out 
if (pageName == 'signout') { // Make sure page is signout page
    signOut(auth).then(() => { // Sign out user
        window.location.replace('index.html') // Redirect to home
    }). catch((error) => { // Catch and alert
        alert(error.message)
    })
}

// Auth system for Forgot Password
if (pageName == 'forgot-password') { // Check that the page is correct
    const forgotPasswordForm = document.querySelector('#forgot-password-form'); // Get form

    forgotPasswordForm.addEventListener('submit', (e) => { // Run on submit
        e.preventDefault(); // Prevent refresh

        const email = forgotPasswordForm['email'].value; // Get entered email

        sendPasswordResetEmail(auth, email).then(() => { // Send user email
            alert('Password reset link sent!')
            window.location.replace('login.html')
        }). catch((error) => { // Catch and alert errors
            alert(error.message)
        })
    })
}

// Auth system for Delete Account
if (pageName == 'delete-account') { // Check if page is correct
    const deleteAcctForm = document.querySelector('#delete-acct-form') // Get form
    deleteAcctForm.addEventListener('submit', (e) => { // Run on submit
        e.preventDefault(); // Prevent refresh

        // Get entered info
        const password = deleteAcctForm['password'].value;
        const username = deleteAcctForm['username'].value;

        const credential = EmailAuthProvider.credential(cUser.email, password) // set credential object

        reauthenticateWithCredential(cUser, credential).then(() => { // Reauthenticate user. Sometimes deleteUser() requires this so we do it everytime to be safe
            deleteUser(cUser).then(() => { // Delete account
                return deleteDoc(doc(db, 'users', cUser.uid)).then(() => { // Delete document in users collection
                    return deleteDoc(doc(db, 'takenNames', username)).then(() => { // delete document in takenNames collection
                        alert('Account has been deleted') // Tell the user
                        window.location.replace('index.html') // Redirect
                    }). catch((error1) => { // Catch errors for second doc delete
                        console.log(error1.message)
                    })
                }). catch((error2) => { // catch errors for first doc delete
                    console.log(error2.message)
                })
            }). catch((error3) => { // Catch errors for deleting users
                console.log(error3.message)
            })
        }). catch((error4) => { // Catch errors for reauth
            if (error4.code == "auth/wrong-password") { // if error is wrong password alert user
                alert('Password is incorrect')
            } else { // any other errors
                console.log(error4.message)
            }
        })
    })

}