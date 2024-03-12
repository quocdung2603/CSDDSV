import { initializeApp } from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    //read data from Firebase    
} from "firebase/auth"
//ref = reference to a "collection"
import {
    getDatabase,
    ref as firebaseDatabaseRef,
    set as firebaseSet,
    child,
    get,
    onValue,
} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBwFmUKhVebguG7HnaJN6lstxBhFR69tmw",
    authDomain: "trade-belongings.firebaseapp.com",
    databaseURL: "https://trade-belongings-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trade-belongings",
    storageBucket: "trade-belongings.appspot.com",
    appId: '1:943162361832:android:dae5e26043e5d09c53065d',
    messagingSenderId: "943162361832",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth() // xác thực account
const firebaseDatabase = getDatabase()

export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    getDatabase,
    firebaseDatabaseRef,
    firebaseSet,
    child,
    get,
    onValue,
}