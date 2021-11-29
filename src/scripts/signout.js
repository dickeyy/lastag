import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { app } from "../main.js";
const auth = getAuth(app);
signOut(auth).then(() => {
    window.location.replace('index.html')
}).catch((error) => {
    console.log('Error', error)
});