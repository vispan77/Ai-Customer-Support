// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-customer-support-94802.firebaseapp.com",
    projectId: "ai-customer-support-94802",
    storageBucket: "ai-customer-support-94802.firebasestorage.app",
    messagingSenderId: "960570165200",
    appId: "1:960570165200:web:67834e4c71999b32f55bd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }

