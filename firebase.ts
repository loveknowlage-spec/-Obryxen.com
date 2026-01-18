
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx6bTYsvyQgdGbO6Khl1ypgBbiD5gbDFw",
  authDomain: "appse-b11e4.firebaseapp.com",
  projectId: "appse-b11e4",
  storageBucket: "appse-b11e4.firebasestorage.app",
  messagingSenderId: "208378141011",
  appId: "1:208378141011:web:67f04c7909177c503929a6",
  measurementId: "G-JWYCDQ3KRH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
