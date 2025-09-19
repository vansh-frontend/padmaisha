// components/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0j6eVEw4juWoh89wJzdi_h0e1Xf7EqFE",
  authDomain: "padmaishaa.firebaseapp.com",
  projectId: "padmaishaa",
  storageBucket: "padmaishaa.firebasestorage.app",
  messagingSenderId: "230032476234",
  appId: "1:230032476234:web:017647867041e778bf7eb3",
  measurementId: "G-HMZ0T21KLM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Do not export analytics to avoid SSR hydration issues
export { app, auth, db };