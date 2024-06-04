// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCmscBtkU9Xq4rTPovxylA58OmlodX9ICU",
  authDomain: "pp-app-43858.firebaseapp.com",
  projectId: "pp-app-43858",
  storageBucket: "pp-app-43858.appspot.com",
  messagingSenderId: "1024905024822",
  appId: "1:1024905024822:web:536d63ecfc93c5ab144f97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 export {db};
