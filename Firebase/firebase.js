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
    apiKey: "AIzaSyDn5NrLfgmQsJzVAqS3p8YZpigQmor3qrg",
    authDomain: "csddsv-815bd.firebaseapp.com",
    databaseURL: "https://csddsv-815bd-default-rtdb.firebaseio.com/",
    projectId: "csddsv-815bd",
    storageBucket: "csddsv-815bd.appspot.com",
    appId: '1:196122505284:android:9bff315c7ef76a323e0c11',
    messagingSenderId: "196122505284",
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