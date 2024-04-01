// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrjzoh9TQiRTy6EOOlknX1wfVnKIfJm1U",
  authDomain: "dexter-182de.firebaseapp.com",
  projectId: "dexter-182de",
  storageBucket: "dexter-182de.appspot.com",
  messagingSenderId: "446518470552",
  appId: "1:446518470552:web:715cc6066f5b3fb51caded",
  measurementId: "G-FDXTRVNTGS"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize DB
export const db = getFirestore(app);


export default db;