import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";
import { Applicant, Position } from "../data/types";

// Retrieve all position in the database
export const getAllPositions = (onUpdate: (positions: Position[]) => void) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/positions`),
    orderBy("createdAt")
  );

  return onSnapshot(q, (querySnapshot) => {
    const positions = querySnapshot.docs.map(doc => 
      doc.data() as Position
    );
    onUpdate(positions);
  });
};

// Retrieve a position by ID
export const getPosition = (
  pid: string,
  onUpdate: (position: Position | null) => void
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
      onUpdate(positionDoc.data() as Position);
    } else {
      onUpdate(null);
    }
  });
};

// Allow applicant to apply for a position!
export const addApplication = async (applicationData: Partial<Applicant>) => {
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
      status: "pending",
      bookMark: false,
      ...applicationData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

// Increment number of applications for a position!
export const incrementApplicantCount = async (pid: string) => {
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

// Retrieves all of the applicant's applications
export const getApplicationsByUser = (
  uid: string,
  onUpdate: (applications: Applicant[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, "applications"),
    where("uid", "==", uid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const applications = querySnapshot.docs.map(doc => 
      doc.data() as Applicant
    );
    onUpdate(applications);
  });
};

// Allow applicant to commit or withdraw from a position!
// After they have been accepted!
export const setApplicantCommitment = async (uid: string, isCommitted: boolean) => {
  try {
    const firestore = getFireStore(true);
    const q = query(
      collection(firestore, "applications"),
      where("uid", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const applicantDoc = querySnapshot.docs[0];
    
    if (applicantDoc) {
      await updateDoc(doc(firestore, "applications", applicantDoc.id), {
        commitment: isCommitted ? "committed" : "uncommitted"
      });
      return true;
    } else {
      throw new Error("Applicant not found");
    }
  } catch (error) {
    console.error("Error updating applicant commitment:", error);
    throw error;
  }
};