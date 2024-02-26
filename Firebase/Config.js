// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbBZF1waA2VB97-ectGpJ3Mc34YLhtjhc",
  authDomain: "fir-retrieve-121d1.firebaseapp.com",
  projectId: "fir-retrieve-121d1",
  storageBucket: "fir-retrieve-121d1.appspot.com",
  messagingSenderId: "148554210410",
  appId: "1:148554210410:web:369ad3992af49cc3953e13"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();



const MESSAGES = 'messages';

export { 
  
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  MESSAGES, 
  orderBy

};