import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "fir-auth-cc-4dbb8.firebaseapp.com",
  projectId: "fir-auth-cc-4dbb8",
  storageBucket: "fir-auth-cc-4dbb8.firebasestorage.app",
  messagingSenderId: "263419537017",
  appId: "1:263419537017:web:b19b07018b2f91edf956a8"
};

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: VITE_FIREBASE_API_KEY,
//   authDomain: "fir-auth-cc-46fa0.firebaseapp.com",
//   projectId: "fir-auth-cc-46fa0",
//   storageBucket: "fir-auth-cc-46fa0.appspot.com",
//   messagingSenderId: "873292002135",
//   appId: "1:873292002135:web:a2e104c826bc8df4274412",
// };

// Initialize Firebase
const firestoreApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(firestoreApp);

export { auth, googleAuthProvider };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAUM6XhJKbJ0IC23yKt3ILJRVfmnVkXxho",
//   authDomain: "fir-auth-cc-4dbb8.firebaseapp.com",
//   projectId: "fir-auth-cc-4dbb8",
//   storageBucket: "fir-auth-cc-4dbb8.firebasestorage.app",
//   messagingSenderId: "263419537017",
//   appId: "1:263419537017:web:b19b07018b2f91edf956a8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);