import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase config here (same as in .env.local)
};


const initializeFirebase = () => {
  initializeApp(firebaseConfig);
  return getAuth();
};

export default initializeFirebase;
