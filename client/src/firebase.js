import { initializeApp } from "firebase/app";

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
