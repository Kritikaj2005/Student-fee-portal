import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6WPnWVhPOreVm4tfHSWqQppgQPdQPHqU",
  authDomain: "student-fee-portal-ae617.firebaseapp.com",
  projectId: "student-fee-portal-ae617",
  storageBucket: "student-fee-portal-ae617.firebasestorage.app",
  messagingSenderId: "61141539333",
  appId: "1:61141539333:web:d37ae471c62047f04a9a6c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);