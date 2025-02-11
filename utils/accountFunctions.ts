import { 
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";

// Retrieves an account (either orgnaization or applicant) based on UID!
export const getAccount = async (uid: string) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const applicantQuery = query(collection(firestore, `/applicants`), where("uid", "==", uid));
  const orgQuery = query(collection(firestore, `/organizations`), where("uid", "==", uid));

  const [applicantSnapshot, orgSnapshot] = await Promise.all([
    getDocs(applicantQuery),
    getDocs(orgQuery)
  ]);

  let account: DocumentData | null = null;
  applicantSnapshot.forEach((doc) => {
    account = doc.data();
  });

  if (!account) {
    orgSnapshot.forEach((doc) => {
      account = doc.data();
    });
  }

  return account;
};

// Adds a new account in the respective database!
export const addAccount = async (userData: {[key:string]: any}) => {
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    const { type } = userData;

    if (type !== "organization" && type !== "individual") {
      throw new Error("Invalid account type. Must be either 'organization' or 'individual'");
    }

    const collectionName = type === "organization" ? "organizations" : "applicants";
    
    await addDoc(collection(firestore, collectionName), {
      uid,
      ...userData,
      profile: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error adding account:", error);
    throw error;
  }
};

// Updates an existing account in the respective database!
export const updateAccount = async (userData: {[key:string]: any}) => {
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    const { type } = userData;

    if (type !== "organization" && type !== "individual") {
      throw new Error("Invalid account type. Must be either 'organization' or 'individual'");
    }

    const collectionName = type === "organization" ? "organizations" : "applicants";
    
    // Query for the document
    const q = query(collection(firestore, collectionName), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Account not found");
    }

    // Get the document reference
    const docRef = querySnapshot.docs[0].ref;

    // Update the document with new data, excluding type and uid
    const { type: _, uid: __, ...updateData } = userData;
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};