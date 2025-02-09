import { 
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
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
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error adding account:", error);
    throw error;
  }
};