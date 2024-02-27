// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx_-qN1BLrcIrViicWpoMbez_INCAXIpI",
  authDomain: "movieflix-by-prashant.firebaseapp.com",
  projectId: "movieflix-by-prashant",
  storageBucket: "movieflix-by-prashant.appspot.com",
  messagingSenderId: "746717984116",
  appId: "1:746717984116:web:8cf49d07d4ea406aeba821",
  measurementId: "G-3FQFZD3V6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);