// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVnfsSXrCKaZmjFUVi0QR_B3ltP5DMmDY",
  authDomain: "react-contact-app-2d28e.firebaseapp.com",
  projectId: "react-contact-app-2d28e",
  storageBucket: "react-contact-app-2d28e.appspot.com",
  messagingSenderId: "466963429990",
  appId: "1:466963429990:web:31f19d2ab0b1f9b640cba7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 