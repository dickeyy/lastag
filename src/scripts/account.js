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
                            html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'><html data-editor-version='2' class='sg-campaigns' xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='Content-Type' content='text/html; charset=utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'> <meta http-equiv='X-UA-Compatible' content='IE=Edge'><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type='text/css'> body{width: 900px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type='text/css'> body, p, div{font-family: arial,helvetica,sans-serif; font-size: 14px;}body{color: #FFFFF;}body a{color: #66fcf1; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}ul ul ul ul{list-style-type: disc !important;}ol ol{list-style-type: lower-roman !important;}ol ol ol{list-style-type: lower-latin !important;}ol ol ol ol{list-style-type: decimal !important;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 100% !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important;}.social-icon-column{display: inline-block !important;}}</style> </head> <body> <center class='wrapper' data-link-color='#66fcf1' data-body-style='font-size:14px; font-family:arial,helvetica,sans-serif; color:#FFFFF; background-color:#0b0c10;'> <div class='webkit'> <table cellpadding='0' cellspacing='0' border='0' width='100%' class='wrapper' bgcolor='#0b0c10'> <tr> <td valign='top' bgcolor='#0b0c10' width='100%'> <table width='100%' role='content-container' class='outer' align='center' cellpadding='0' cellspacing='0' border='0'> <tr> <td width='100%'> <table width='100%' cellpadding='0' cellspacing='0' border='0'> <tr> <td><!--[if mso]> <center> <table><tr><td width='900'><![endif]--> <table width='100%' cellpadding='0' cellspacing='0' border='0' style='width:100%; max-width:900px;' align='center'> <tr> <td role='modules-container' style='padding:0px 0px 0px 0px; color:#FFFFF; text-align:left;' bgcolor='#1f2833' width='100%' align='left'><table class='module preheader preheader-hide' role='module' data-type='preheader' border='0' cellpadding='0' cellspacing='0' width='100%' style='display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;'> <tr> <td role='module-content'> <p></p></td></tr></table><table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='bc7db9d4-9ced-4dc4-860d-bfa17fedbd25'> <tbody> <tr> <td style='padding:0px 0px 30px 0px;' role='module-content' bgcolor=''> </td></tr></tbody> </table><table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='8abf0e1c-0858-4db4-bf59-7b81aa30a2ce' data-mc-module-version='2019-10-22'> <tbody> <tr> <td style='padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;' height='100%' valign='top' bgcolor='' role='module-content'><div><h1 style='text-align: center'><span style='font-size: 48px; color: #66fcf1'><strong>Username Changed</strong></span></h1><div></div></div></td></tr></tbody> </table><table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='09787549-b0d7-42b3-8d41-8e80727e04a0'> <tbody> <tr> <td style='padding:0px 0px 30px 0px;' role='module-content' bgcolor=''> </td></tr></tbody> </table><table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='8b1c4f4f-15d6-421b-940c-3c0121d015b3' data-mc-module-version='2019-10-22'> <tbody> <tr> <td style='padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;' height='100%' valign='top' bgcolor='' role='module-content'><div><div style='font-family: inherit; text-align: center'><span style='color: #ffffff'>Your LasTag username was just changed!</span></div><div style='font-family: inherit; text-align: center'><br></div><div style='font-family: inherit; text-align: center'><br></div><div style='font-family: inherit; text-align: center'><span style='color: #ffffff'>If you did not do this, please click the button below to change your password immediately.&nbsp;</span></div><div></div></div></td></tr></tbody> </table><table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='6191f3f1-7ca1-4e7d-b694-90674b47693c'> <tbody> <tr> <td style='padding:0px 0px 30px 0px;' role='module-content' bgcolor=''> </td></tr></tbody> </table><table border='0' cellpadding='0' cellspacing='0' class='module' data-role='module-button' data-type='button' role='module' style='table-layout:fixed;' width='100%' data-muid='e1741e39-9ca8-4c79-bc80-bfdd04f0d176'> <tbody> <tr> <td align='center' bgcolor='' class='outer-td' style='padding:0px 0px 0px 0px;'> <table border='0' cellpadding='0' cellspacing='0' class='wrapper-mobile' style='text-align:center;'> <tbody> <tr> <td align='center' bgcolor='#1f2833' class='inner-td' style='border-radius:6px; font-size:16px; text-align:center; background-color:inherit;'> <a href='https://lastag.xyz/forgot-password' style='background-color:#1f2833; border:2px solid #66fcf1; border-color:#66fcf1; border-radius:13px; border-width:2px; color:#ffffff; display:inline-block; font-weight:700; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; font-size:20px;' target='_blank'>If you did not do this, click here</a> </td></tr></tbody> </table> </td></tr></tbody> </table><table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='76af4a0a-6de6-48e3-9bb7-647cd1ee7137'> <tbody> <tr> <td style='padding:0px 0px 30px 0px;' role='module-content' bgcolor=''> </td></tr></tbody> </table><table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='7ebcaf62-599b-4ede-948b-464624b4d19b' data-mc-module-version='2019-10-22'> <tbody> <tr> <td style='padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;' height='100%' valign='top' bgcolor='' role='module-content'><div><div style='font-family: inherit; text-align: center'><span style='font-size: 18px; color: #45a29e'><strong>- LasTag Team</strong></span></div><div></div></div></td></tr></tbody> </table><table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='0cc3f37a-9e81-4b08-85c6-0faa70d40d1a' data-mc-module-version='2019-10-22'> <tbody> <tr> <td style='padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;' height='100%' valign='top' bgcolor='' role='module-content'><div><div style='font-family: inherit; text-align: center'><span style='color: #3c4d63'>Do not reply to this email. If you need support please email </span><a href='mailto:support@lastag.xyz?subject=&amp;body='><span style='color: #3c4d63'>support@lastag.xyz</span></a></div><div></div></div></td></tr></tbody> </table><table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;' data-muid='02803d00-86a3-4952-8c0c-fb16f37aa7eb'> <tbody> <tr> <td style='padding:0px 0px 100px 0px;' role='module-content' bgcolor=''> </td></tr></tbody> </table><div data-role='module-unsubscribe' class='module' role='module' data-type='unsubscribe' style='color:#3c4d63; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;' data-muid='4e838cf3-9892-4a6d-94d6-170e474d21e5'><div class='Unsubscribe--addressLine'><p class='Unsubscribe--senderName' style='font-size:12px; line-height:20px;'>{{Sender_Name}}</p><p style='font-size:12px; line-height:20px;'><span class='Unsubscribe--senderAddress'>{{Sender_Address}}</span>, <span class='Unsubscribe--senderCity'>{{Sender_City}}</span>, <span class='Unsubscribe--senderState'>{{Sender_State}}</span> <span class='Unsubscribe--senderZip'>{{Sender_Zip}}</span></p></div><p style='font-size:12px; line-height:20px;'><a class='Unsubscribe--unsubscribeLink' href='{{{unsubscribe}}}' target='_blank' style='color:#45a29e;'>Unsubscribe</a> - <a href='{{{unsubscribe_preferences}}}' target='_blank' class='Unsubscribe--unsubscribePreferences' style='color:#45a29e;'>Unsubscribe Preferences</a></p></div></td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body> </html>"
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
        })

      })
    }
})