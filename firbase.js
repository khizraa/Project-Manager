// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp-2EbBJaL9Qv7X5V4sNKr-lAQd41a-xg",
  authDomain: "project-list-fa0e8.firebaseapp.com",
  projectId: "project-list-fa0e8",
  storageBucket: "project-list-fa0e8.firebasestorage.app",
  messagingSenderId: "564631578617",
  appId: "1:564631578617:web:0414d03536afaa7ca4ff28",
  measurementId: "G-EVFVE2NZN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };