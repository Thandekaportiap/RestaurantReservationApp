import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvZ_MgWJ_mCraYazF1vOrvPwxvY2QXv_Q",
    authDomain: "restaurentapp-ff659.firebaseapp.com",
    projectId: "restaurentapp-ff659",
    storageBucket: "restaurentapp-ff659.firebasestorage.app",
    messagingSenderId: "1004849143573",
    appId: "1:1004849143573:web:7b0c87a7f458bdc838531c",
    measurementId: "G-TBGMVS10JY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc };
