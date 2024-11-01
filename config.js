import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIwOxG_ef7A2Xip8AsWUZ8IoZV8VBpLvM",
  authDomain: "lunchproapp.firebaseapp.com",
  projectId: "lunchproapp",
  storageBucket: "lunchproapp.appspot.com",
  messagingSenderId: "152392983898",
  appId: "1:152392983898:web:d2226b907876e786ffbf63",
  measurementId: "G-SH04LLPWGP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
