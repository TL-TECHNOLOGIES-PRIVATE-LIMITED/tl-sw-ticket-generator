// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {  collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
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
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);


export const saveUserDetails = async (userData) => {
  try {
    const userRef = collection(db, "users");
    const docRef = await addDoc(userRef, {
      ...userData,
      createdAt: new Date().toISOString(),
      status: "active"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving user details:", error);
    return { success: false, error: error.message };
  }
};

export const saveTicketDetails = async (ticketData) => {
  try {
    const ticketRef = collection(db, "tickets");
    const docRef = await addDoc(ticketRef, {
      ...ticketData,
      createdAt: new Date().toISOString(),
      status: "valid"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving ticket details:", error);
    return { success: false, error: error.message };
  }
};

export const getUserByPhone = async (phoneNumber) => {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("userPhone", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { success: true, data: userData };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message };
  }
};

export const getTicketByUser = async (userId) => {
  try {
    const ticketRef = collection(db, "tickets");
    const q = query(ticketRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const ticketData = querySnapshot.docs[0].data();
      return { success: true, data: ticketData };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return { success: false, error: error.message };
  }
};

export { app, db, auth };