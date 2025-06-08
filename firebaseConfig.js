// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFkVb5eUVxEtYJT6X3pLqO-JawmJ-q8V0",
  authDomain: "foodorderapp-b9837.firebaseapp.com",
  projectId: "foodorderapp-b9837",
  storageBucket: "foodorderapp-b9837.firebasestorage.app",
  messagingSenderId: "561212340290",
  appId: "1:561212340290:web:e1893d816b3a5b7955d5db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);