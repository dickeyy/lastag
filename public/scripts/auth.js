import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, Timestamp, addDoc, collection, updateDoc, arrayUnion  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { app } from "../main.js";

// Set consts
const auth = getAuth(app)
await new Promise(r => setTimeout(r, 5000)); // wait for auth to initialize
const cUser = auth.currentUser // define current user
const settings = { experimentalForceLongPolling: true, } 
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
        signUpForm.addEventListener('submit', (e) => { // Runs on form submit
            e.preventDefault();
            
            // Get entered info
            const email = signUpForm['email'].value;
            const password = signUpForm['password'].value;
            const confPassword = signUpForm['confPassword'].value
            const name = signUpForm['name'].value;
            const username = signUpForm['username'].value;
            const mailCheck = signUpForm['mailCheck'].checked;
            
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
                                pfp_url: "https://i.imgur.com/wPQKXTY.png",
                                username: username,
                            }). then (() => { // If that works then create doc in usernames collection
                                console.log('Created doc in users')
                                return setDoc(doc(db, 'takenNames', username), {
                                    uid: cred.user.uid,
                                    changedAt: Timestamp.now().toDate()
                                }) // Line 100
                            }). then (() => {
                                const sendEmail = addDoc(collection(db, 'emailSent'), {
                                    to: cred.user.email,
                                    message: {
                                        subject: 'Welcome to LasTag!',
                                        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"> <!--[if !mso]><!--> <meta http-equiv="X-UA-Compatible" content="IE=Edge"> <!--<![endif]--> <!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if (gte mso 9)|(IE)]> <style type="text/css"> body {width: 900px;margin: 0 auto;} table {border-collapse: collapse;} table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;} img {-ms-interpolation-mode: bicubic;} </style><![endif]--> <style type="text/css"> body, p, div { font-family: arial,helvetica,sans-serif; font-size: 14px; } body { color: #FFFFFF; } body a { color: #66fcf1; text-decoration: none; } p { margin: 0; padding: 0; } table.wrapper { width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } img.max-width { max-width: 100% !important; } .column.of-2 { width: 50%; } .column.of-3 { width: 33.333%; } .column.of-4 { width: 25%; } ul ul ul ul { list-style-type: disc !important; } ol ol { list-style-type: lower-roman !important; } ol ol ol { list-style-type: lower-latin !important; } ol ol ol ol { list-style-type: decimal !important; } @media screen and (max-width:480px) { .preheader .rightColumnContent, .footer .rightColumnContent { text-align: left !important; } .preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span { text-align: left !important; } .preheader .rightColumnContent, .preheader .leftColumnContent { font-size: 80% !important; padding: 5px 0; } table.wrapper-mobile { width: 100% !important; table-layout: fixed; } img.max-width { height: auto !important; max-width: 100% !important; } a.bulletproof-button { display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important; } .columns { width: 100% !important; } .column { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; } .social-icon-column { display: inline-block !important; } } </style> <!--user entered Head Start--><!--End Head user entered--> </head> <body> <center class="wrapper" data-link-color="#66fcf1" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#FFFFFF; background-color:#0b0c10;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#0b0c10"> <tr> <td valign="top" bgcolor="#0b0c10" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <!--[if mso]> <center> <table><tr><td width="900"> <![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:900px;" align="center"> <tr> <td role="modules-container" style="padding:0px 0px 0px 0px; color:#FFFFFF; text-align:left;" bgcolor="#1f2833" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Welcome</p> </td> </tr> </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7f7686b4-cf6c-48b3-97c8-57d280909a89"> <tbody> <tr> <td style="padding:0px 0px 50px 0px;" role="module-content" bgcolor=""> </td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c9525189-cfc3-40af-9b82-e7cde444c7c3" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: center"><span style="font-size: 72px"><strong>Welcome to</strong></span><span style="color: #66fcf1; font-size: 72px"><strong>&nbsp;</strong></span></h1><h1 style="text-align: center"><span style="color: #66fcf1; font-size: 72px"><strong>LasTag!</strong></span></h1><div></div></div></td> </tr> </tbody> </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a9b88a9c-a8e6-434c-a318-065eb4577f62"> <tbody> <tr> <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor=""> </td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="89b2aa4b-21c6-4e43-b514-54458a72b84a" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 50px 18px 50px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px">Thank you for using LasTag. You can now access your account page where you can change some personal information, and customize your profile. You can access your account below.</span></div><div></div></div></td> </tr> </tbody> </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="53d07559-ce4a-4c0e-a80c-b120009654c4"> <tbody> <tr> <td style="padding:0px 0px 60px 0px;" role="module-content" bgcolor=""> </td> </tr> </tbody> </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="dae63752-9e53-4ebe-8f5f-cd79d6485bf6"> <tbody> <tr> <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;"> <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;"> <tbody> <tr> <td align="center" bgcolor="#1f2833" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"> <a href="https://lastag.xyz/account" style="background-color:#1f2833; border:3px solid #66fcf1; border-color:#66fcf1; border-radius:13px; border-width:3px; color:#ffffff; display:inline-block; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; font-size:50px;" target="_blank">Account</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="13d57894-58c4-43a6-9b31-159b84bf1028"> <tbody> <tr> <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor=""> </td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a623026e-d6f5-4315-a504-c262a8a26360" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">With Love,</div><div style="font-family: inherit; text-align: center">LasTag Team</div><div></div></div></td> </tr> </tbody> </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b600747e-b05c-450d-bc41-a3a0247668e0"> <tbody> <tr> <td style="padding:0px 0px 100px 0px;" role="module-content" bgcolor=""> </td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="245d344d-a599-4cc0-a96d-58aee943ca55" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 60px 18px 60px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-family: arial, helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(31, 40, 51); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">Please note, LasTag is still currently under development, because of this, full functionality of the site is not yet ready for use.</span> We are sorry for any inconvenience.</div><div></div></div></td> </tr> </tbody> </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td> </tr> </table> <!--[if mso]> </td> </tr> </table> </center> <![endif]--> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </center> </body> </html>'
                                    }
                                })
                                console.log('Made Email Doc')
                            }). then(() => {
                                const addTags = setDoc(doc(db, 'tags', cred.user.uid), {
                                    page_color: '#1f2833',
                                    socials: [],
                                    tags: []
                                })
                                console.log('Made Tag Doc')
                            }). then(() => {
                                if (mailCheck == true) {
                                    const addMailList = setDoc(doc(db, 'mailList', email), {
                                        email: email, 
                                        addedAt: Timestamp.now().toDate(),
                                    })
                                    console.log('Added to Mail List')
                                } else {
                                    console.log()
                                }
                            })
                        }). then(() => { // If that works then send email and redirect
                            
                            signUpForm.reset()
                            window.location.replace('account.html')
                        }). catch(error => { // Catch errors and report
                            if (error.code == 'auth/email-already-in-use') { // If user already exists
                                alert('Email is already in use, please sign in')
                            } else { // If its something else 
                                alert(error.message)
                                console.log(error)
                            } // Line 111
                        }) // Line 108
                    } // Line 93
                } // Line 84
            }) // Line 81
        }) // Line 63         
    } // Line 37
}

// Auth system for Log In
if (pageName == 'login') { // If page is login
    if (cUser != null) { // Redirect if logged in
        window.location.replace('account.html')
    } else {

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
                    } // Line 162
            }) // Line 157    
        }) // Line 147
    } // Line 126
} // Line 123

// Auth system for sign out 
if (pageName == 'signout') { // Make sure page is signout page
    signOut(auth).then(() => { // Sign out user
        window.location.replace('index.html') // Redirect to home
    }). catch((error) => { // Catch and alert
        alert(error.message)
    }) // Line 174
} // Line 171

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
        }) // Line 191
    }) // Line 183
} // Line 180

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
                        return deleteDoc(doc(db, 'tags', cUser.uid)).then(() =>{
                            alert('Account has been deleted') // Tell the user
                            window.location.replace('index.html') // Redirect
                        })
                    }). catch((error1) => { // Catch errors for second doc delete
                        console.log(error1.message)
                    }) // Line 215
                }). catch((error2) => { // catch errors for first doc delete
                    console.log(error2.message)
                }) // Line 218
            }). catch((error3) => { // Catch errors for deleting users
                console.log(error3.message)
            }) // Line 221
        }). catch((error4) => { // Catch errors for reauth
            if (error4.code == "auth/wrong-password") { // if error is wrong password alert user
                alert('Password is incorrect')
            } else { // any other errors
                console.log(error4.message)
            } // Line 227
        }) // Line 224
    }) // Line 200
} // Line 198

// Coming soon page 
if (pageName == 'coming-soon') {
    const comingSoonForm = document.querySelector('#comingSoonForm')
    comingSoonForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = comingSoonForm['email'].value;

        return setDoc(doc(db, 'mailList', email), {
            email: email, 
            addedAt: Timestamp.now().toDate(),
        }). then(() => {
            const sendEmail = addDoc(collection(db, 'emailSent'), {
                to: email,
                message: {
                    subject: 'Welcome to LasTag!',
                    text: 'Thank you for signing up for notifications for LasTag! To unsubscribe, follow this link https://lastag.xyz/unsubscribe'
                }
            })
        }). then(() => {
            comingSoonForm.reset()
            alert('Thank you for signing up')
        })
    })
}

// Contact page
if (pageName == 'contact') {
    const contactForm = document.querySelector('#contactForm')
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const supportEmail = 'support@lastag.xyz'

        const email = contactForm['email'].value;
        const name = contactForm['name'].value;
        const subject = contactForm['subject'].value;
        const message = contactForm['textarea'].value;

        const sendSupport = addDoc(collection(db, 'emailSent'), {
            to: supportEmail,
            message: {
                subject: 'Support Ticket',
                text: `New Support Ticket:\n\nEmail: ${email}\nName: ${name}\nSubject: ${subject}\nMessage: ${message}`
            }
        })

        const sendEmailUser = addDoc(collection(db, 'emailSent'), {
            to: email, 
            message: {
                subject: 'Support Ticket Opened',
                text: 'Thank you for contacting LasTag support, someone from our team will reach out to you shortly. Thanks!\n\nTo follow up on your ticket, please email support@lastag.xyz\n\n-LasTag Team'
            }
        })

        alert('Your message has been sent. You should see a confirmation email shortly.')
        contactForm.reset()
    })
}

// Auth for dashboard
if (pageName == 'dashboard') {

    if (cUser == null) {
        window.location.replace('login.html')
    } else {

        const getUername = getDoc(doc(db, 'users', cUser.uid)).then((uData) => {
            const username = uData.data()['username']

            var iFrame = document.getElementById('iframe');
            iFrame.src = `https://lstg.xyz/${username}`
            var link1 = document.getElementById('link1');
            link1.innerText = `https://lastag.xyz/${username}`
            link1.href = `https://lastag.xyz/${username}`
            var link2 = document.getElementById('link2');
            link2.innerText = `https://lstg.xyz/${username}`
            link2.href = `https://lstg.xyz/${username}`
        })

        const getTags = getDoc(doc(db, 'tags', cUser.uid)).then((iData) => {
            
            const cSocials = iData.data()['socials'];
            const cTags = iData.data()['tags'];

            var cTagsElement = document.querySelector('#games')

            function gDeleteItem(x) {
                cTags.splice(
                    cTags.findIndex((item) => item.id == x),
                    1
                )
                displayTags()

                return updateDoc(doc(db, 'tags', cUser.uid), {
                    tags: cTags
                }). then(() => {
                    window.location.reload()
                })
            }

            function displayTags() {
                cTagsElement.innerHTML = "";
                
                cTags.forEach((item) => {
                    const listElement = document.createElement('li');
                    const delBtn = document.createElement('i');

                    listElement.innerHTML = item;
                    listElement.setAttribute("data-id", item.id)
                    listElement.classList.add('tag-li')

                    delBtn.setAttribute('data-id', item.id);
                    delBtn.classList.add('far');
                    delBtn.classList.add("fa-trash-alt");
                    delBtn.setAttribute("data-id", item.id);

                    delBtn.addEventListener("click", function(e) {
                        const delId = e.target.getAttribute('data-id');
                        gDeleteItem(delId)
                    })

                    cTagsElement.appendChild(listElement);
                    listElement.appendChild(delBtn);
                })
            }

            displayTags()

            var cSocialsElement = document.querySelector('#socials')

            function sDeleteItem(x) {
                cSocials.splice(
                    cSocials.findIndex((item) => item.id == x),
                    1
                )
                displaySocials()
                
                return updateDoc(doc(db, 'tags', cUser.uid), {
                    socials: cSocials
                }). then(() => {
                    window.location.reload()
                })
            }

            function displaySocials() {
                cSocialsElement.innerHTML = "";
                
                cSocials.forEach((item) => {
                    const listElement = document.createElement('li');
                    const delBtn = document.createElement('i');

                    var splitItem = item.split("##!!")

                    listElement.innerHTML = `${splitItem[0]}: ${splitItem[1]}`;
                    listElement.setAttribute("data-id", item.id)
                    listElement.classList.add('tag-li')

                    delBtn.setAttribute('data-id', item.id);
                    delBtn.classList.add('far');
                    delBtn.classList.add("fa-trash-alt");
                    delBtn.setAttribute("data-id", item.id);

                    delBtn.addEventListener("click", function(e) {
                        const delId = e.target.getAttribute('data-id');
                        sDeleteItem(delId)
                    })

                    cSocialsElement.appendChild(listElement);
                    listElement.appendChild(delBtn);
                })
            }

            displaySocials()

        })

        const gameForm = document.querySelector('#gameForm')
        gameForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const gameName = gameForm['gameName'].value;
            const gameTag = gameForm['gameTag'].value;

            const newTag = `${gameName}: ${gameTag}`

            const gDocRef = updateDoc(doc(db, 'tags', cUser.uid), {
                tags: arrayUnion(newTag)
            }). then(() => {
                alert('Added Tag')
                window.location.reload()
            }). catch((e) => {
                alert(e.message)
            }) 
        })

        const socialForm = document.querySelector('#socialForm');
        socialForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const socialName = socialForm['socialName'].value;
            const socialUser = socialForm['socialUser'].value;

            const newSocial = `${socialName}##!!${socialUser}`;

            const sDocRef = updateDoc(doc(db, 'tags', cUser.uid), {
                socials: arrayUnion(newSocial)
            }). then(() => {
                alert('Added Social Media')
                window.location.reload()
            }). catch((e) => {
                alert(e.message)
            })
        })

        const colorForm = document.querySelector('#colorForm');
        colorForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const color = colorForm['color'].value;

            const cDocRef = updateDoc(doc(db, 'tags', cUser.uid), {
                page_color: color
            }). then(() => {
                alert('Changed Page Color')
                window.location.reload()
            }). catch((e) => {
                alert(e.message)
            })
        })

    }
}