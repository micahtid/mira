import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDOrCxSMFcarGTAKYeJ-ybD6ZlK5RUHzc4",
    authDomain: "mira-5e906.firebaseapp.com",
    projectId: "mira-5e906",
    storageBucket: "mira-5e906.firebasestorage.app",
    messagingSenderId: "544535327669",
    appId: "1:544535327669:web:6e5d6be5542145c4f45ffc",
    measurementId: "G-ETVCK1SHMM"
  };

  const app = initializeApp(firebaseConfig);
  return app;
}

export const getUserAuth = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const auth = getAuth();
  return auth;
}

export const getFireStore = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const firestore = getFirestore();
  return firestore;
}

////////////////////////////////
////////////////////////////////

export const signIn = () => {
  const auth = getUserAuth(false);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export const signOut = () => {
  const auth = getUserAuth(false);
  auth.signOut();
}
