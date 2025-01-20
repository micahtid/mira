import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, serverTimestamp, where, getDocs, arrayUnion, doc } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databaseFunctions";

export const getPositions = (
  oid: string,
  onUpdate: (positions: DocumentData[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/positions`),
    where("oid", "==", oid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const positions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    onUpdate(positions);
  });
};

export const addPosition = async (positionData: {[key:string]: any}) => {
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    await addDoc(collection(firestore, "positions"), {
      oid: uid,
      ...positionData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating position:", error);
    throw error;
  }
};

// TO ADD: Edit Position, Delete Position