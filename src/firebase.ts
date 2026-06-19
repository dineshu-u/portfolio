// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTG95Y32zNIPv0lJQXK0sXP-QRK0E-mgk",
  authDomain: "dinesh-b.firebaseapp.com",
  projectId: "dinesh-b",
  storageBucket: "dinesh-b.firebasestorage.app",
  messagingSenderId: "782501882713",
  appId: "1:782501882713:web:62d0da9504fb5efa8ffa48",
  measurementId: "G-B00KVLWVV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);