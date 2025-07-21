// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcDnVsBOKe6nQU7c18NzRrQjTCCS7UJk8",
  authDomain: "huntersht-9ea46.firebaseapp.com",
  projectId: "huntersht-9ea46",
  storageBucket: "huntersht-9ea46.firebasestorage.app",
  messagingSenderId: "603952439109",
  appId: "1:603952439109:web:6b8e1b1bb5c3717116e82c",
  measurementId: "G-1PPQ9QZD5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db, firebaseConfig};