import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBPnOmzHy6dWIG90tiHJp-yI1RU7fWL4fo",
    authDomain: "netflix-clone-30bb5.firebaseapp.com",
    projectId: "netflix-clone-30bb5",
    storageBucket: "netflix-clone-30bb5.appspot.com",
    messagingSenderId: "1082049011154",
    appId: "1:1082049011154:web:a56cacf1a736580f06fc0b"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth();

export {auth}
export default db