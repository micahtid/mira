import { 
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";
import { Position } from "../data/types";

// RETURN: Single account based on UID.
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

////////////////////////////////
////////////////////////////////

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

////////////////////////////////
////////////////////////////////

// Either INCREMENT or DECREMENT .openSlots!
export const updateOpenSlots = async (pid: string, increment: number): Promise<void> => {
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
    
    // Check if decrementing would result in negative slots
    if (increment < 0 && position.openSlots + increment < 0) {
      throw new Error("No open slots remaining");
    }

    await updateDoc(doc(firestore, "positions", positionDoc.id), {
      openSlots: position.openSlots + increment
    });
  } catch (error) {
    console.error(`Error ${increment > 0 ? 'incrementing' : 'decrementing'} open slots:`, error);
    throw error;
  }
};

// .committedApplicants + 1!
export const incrementCommittedApplicants = async (pid: string): Promise<void> => {
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

    // If committedApplicants equals totalSlots, lock the position
    if ((position.committedApplicants || 0) + 1 === position.totalSlots) {
      await updateDoc(doc(firestore, "positions", positionDoc.id), {
        locked: true,
        visible: false
      });
    }

    await updateDoc(doc(firestore, "positions", positionDoc.id), {
      committedApplicants: (position.committedApplicants || 0) + 1
    });
  } catch (error) {
    console.error("Error incrementing committed applicants:", error);
    throw error;
  }
};
