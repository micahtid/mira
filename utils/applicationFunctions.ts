import { DocumentData, query, collection, onSnapshot, where } from "firebase/firestore";
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