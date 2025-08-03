// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-app-b62ee.firebaseapp.com",
  projectId: "pet-app-b62ee",
  storageBucket: "pet-app-b62ee.appspot.com",
  messagingSenderId: "939395059936",
  appId: "1:939395059936:web:8d86c662c573310b7c4085",
  measurementId: "G-6FR813ETVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const storage = getStorage(app)