import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCustomToken,
  browserLocalPersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApnlo2uEsOLmCSnolrhD6Bcuc-YEpcki0",
  authDomain: "digital-porichoy.firebaseapp.com",
  databaseURL: "https://digital-porichoy-default-rtdb.firebaseio.com",
  projectId: "digital-porichoy",
  storageBucket: "digital-porichoy.appspot.com",
  messagingSenderId: "617520156153",
  appId: "1:617520156153:web:10e3a15471e13d225d8128",
  measurementId: "G-09LBJR0SHG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCustomToken,
  browserLocalPersistence,
};
