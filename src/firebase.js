// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs7yYnnEO0I6AvrCsA03lWdaZzFeymdxE",
  authDomain: "todoapp-f0763.firebaseapp.com",
  projectId: "todoapp-f0763",
  storageBucket: "todoapp-f0763.appspot.com",
  messagingSenderId: "1083395635001",
  appId: "1:1083395635001:web:98ce78f8ec385fdc051ae8",
  measurementId: "G-85CRMLWVNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
