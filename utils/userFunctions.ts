import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, serverTimestamp, where, getDocs, arrayUnion, doc } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databaseFunctions";

export const getUser = async (uid: string): Promise<DocumentData | null> => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(collection(firestore, `/users`), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  let user: DocumentData | null = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });

  return user;
};
