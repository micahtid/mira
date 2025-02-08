import { addDoc, query, DocumentData, onSnapshot, collection, updateDoc, serverTimestamp, where, getDocs, arrayUnion, doc } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databaseFunctions";

// Retrieves a user by their ID
export const getUser = async (uid: string) => {
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

// Creates a new user in the database
export const addUser = async (userData: {[key:string]: any}) => {
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    await addDoc(collection(firestore, "users"), {
      uid,
      ...userData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};