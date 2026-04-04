// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "prepflow-de68d.firebaseapp.com",
  projectId: "prepflow-de68d",
  storageBucket: "prepflow-de68d.firebasestorage.app",
  messagingSenderId: "70334261131",
  appId: "1:70334261131:web:4d4f7f6cd034cdad99b18e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}