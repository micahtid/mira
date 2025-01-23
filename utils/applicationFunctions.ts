import { DocumentData, query, collection, onSnapshot, where, addDoc, serverTimestamp, doc, updateDoc, increment, getDocs } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databaseFunctions";

export const getPosition = (
  pid: string,
  onUpdate: (position: DocumentData | null) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/positions`),
    where("pid", "==", pid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const positionDoc = querySnapshot.docs[0];
    if (positionDoc) {
      onUpdate({ id: positionDoc.id, ...positionDoc.data() });
    } else {
      onUpdate(null);
    }
  });
};

export const addApplication = async (applicationData: {[key:string]: any}) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    await addDoc(collection(firestore, "applications"), {
      uid,
      ...applicationData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

export const incrementPositionCount = async (pid: string) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  try {
    const q = query(
      collection(firestore, "positions"),
      where("pid", "==", pid)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("Position not found");
    }

    const positionDoc = querySnapshot.docs[0];
    await updateDoc(positionDoc.ref, {
      positionApplicants: increment(1)
    });
    
    return true;
  } catch (error) {
    console.error("Error incrementing position count:", error);
    throw error;
  }
};