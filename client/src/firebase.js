// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f9e7c.firebaseapp.com",
  projectId: "mern-estate-f9e7c",
  storageBucket: "mern-estate-f9e7c.appspot.com",
  messagingSenderId: "671892566850",
  appId: "1:671892566850:web:4c80c867c94cb79e530edb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
