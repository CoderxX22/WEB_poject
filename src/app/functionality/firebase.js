// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvt22jOX_a7jG09kVPfNPJPf54XSRtp5I",
  authDomain: "healthvisualizerdb.firebaseapp.com",
  projectId: "healthvisualizerdb",
  storageBucket: "healthvisualizerdb.appspot.com", // Corrected from '.firebasestorage.app' to '.appspot.com'
  messagingSenderId: "7793169763",
  appId: "1:7793169763:web:21519f747fb321cb29ef56",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
