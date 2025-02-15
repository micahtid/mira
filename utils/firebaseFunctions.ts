import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { getFirestore, query, collection, orderBy, onSnapshot, getDocs, where, updateDoc, doc } from "firebase/firestore";
import { Position } from "../data/types";

export const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyA7DZakhbXMEo5vY-OTAOwj7oUJb5uJN6k",
        authDomain: "mira-6cca9.firebaseapp.com",
        projectId: "mira-6cca9",
        storageBucket: "mira-6cca9.firebasestorage.app",
        messagingSenderId: "430327845549",
        appId: "1:430327845549:web:5fa0457dc509f5fe476c24",
        measurementId: "G-RKBSFBDNL8"
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

export const signIn = () => {
  const auth = getUserAuth(false);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export const signOut = () => {
  const auth = getUserAuth(false);
  auth.signOut();
}

///////////////////////////////////
export const getAllPositions = (onUpdate: (positions: Position[]) => void) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/positions`),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const positions = querySnapshot.docs.map(doc => 
      doc.data() as Position
    );
    onUpdate(positions);
  });
};

///////////////////////////////////
export const decrementAvailableSlots = async (pid: string): Promise<void> => {
  try {
    const firestore = getFireStore(true);
    const q = query(
      collection(firestore, "positions"),
      where("pid", "==", pid)
    );

    const querySnapshot = await getDocs(q);
    const positionDoc = querySnapshot.docs[0];
    
    if (!positionDoc) {
      throw new Error("Position not found");
    }

    const position = positionDoc.data() as Position;
    if (position.availableSlots <= 0) {
      throw new Error("No available slots remaining");
    }

    await updateDoc(doc(firestore, "positions", positionDoc.id), {
      availableSlots: position.availableSlots - 1
    });
  } catch (error) {
    console.error("Error decrementing available slots:", error);
    throw error;
  }
};

export const incrementAvailableSlots = async (pid: string): Promise<void> => {
  try {
    const firestore = getFireStore(true);
    const q = query(
      collection(firestore, "positions"),
      where("pid", "==", pid)
    );

    const querySnapshot = await getDocs(q);
    const positionDoc = querySnapshot.docs[0];
    
    if (!positionDoc) {
      throw new Error("Position not found");
    }

    const position = positionDoc.data() as Position;
    await updateDoc(doc(firestore, "positions", positionDoc.id), {
      availableSlots: position.availableSlots + 1
    });
  } catch (error) {
    console.error("Error incrementing available slots:", error);
    throw error;
  }
};

