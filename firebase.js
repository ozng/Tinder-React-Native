import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBC7fLCqBTd-pn7RU0SELDm_t8bYhFkoP0",
    authDomain: "tinder-clone-rn-eeff5.firebaseapp.com",
    projectId: "tinder-clone-rn-eeff5",
    storageBucket: "tinder-clone-rn-eeff5.appspot.com",
    messagingSenderId: "111776572481",
    appId: "1:111776572481:web:ddbb7abdf11066b68692c0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }
