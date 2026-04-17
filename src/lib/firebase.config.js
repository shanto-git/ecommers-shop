// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU_0UAKhJAlQItqspNe3FTdWy66l4_4pw",
  authDomain: "ecommerce-shop-1d8d5.firebaseapp.com",
  projectId: "ecommerce-shop-1d8d5",
  storageBucket: "ecommerce-shop-1d8d5.firebasestorage.app",
  messagingSenderId: "1017651256245",
  appId: "1:1017651256245:web:3223016dc52ea6f18897fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();