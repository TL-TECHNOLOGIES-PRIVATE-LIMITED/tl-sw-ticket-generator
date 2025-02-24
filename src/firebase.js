// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv5eb6I1AEY_UfX1S8r2IVOWJD0sIVFXo",
  authDomain: "swayamvara-ticket-generator.firebaseapp.com",
  projectId: "swayamvara-ticket-generator",
  storageBucket: "swayamvara-ticket-generator.firebasestorage.app",
  messagingSenderId: "586038179958",
  appId: "1:586038179958:web:195e1f3393364472c28757",
  measurementId: "G-QWX9RVZ9L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);