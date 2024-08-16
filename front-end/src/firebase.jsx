// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAS_API_KEY,
  authDomain: "mern-estate-e9b53.firebaseapp.com",
  projectId: "mern-estate-e9b53",
  storageBucket: "mern-estate-e9b53.appspot.com",
  messagingSenderId: "810538656732",
  appId: "1:810538656732:web:53823ec51f223845cc6519",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
