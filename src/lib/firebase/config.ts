import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvkG8v0c2t3VDXYvMUaTets41Q7vWvUJc",
  authDomain: "mswtours-d3b1d.firebaseapp.com",
  projectId: "mswtours-d3b1d",
  storageBucket: "mswtours-d3b1d.firebasestorage.app",
  messagingSenderId: "243154318779",
  appId: "1:243154318779:web:bfcd7c043691c0b910c09e",
  measurementId: "G-Y93J071QVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 