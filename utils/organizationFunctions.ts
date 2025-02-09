import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";
import { Applicant, Position } from "../data/types";

// Allow organization to create a position!
export const addPosition = async (positionData: Partial<Position>) => {
  const app = initializeFirebase();
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

// Allow organization to delete a position!
export const deletePosition = async (pid: string) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);
  
  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const positionRef = doc(firestore, "positions", pid);
    await deleteDoc(positionRef);
    return true;
  } catch (error) {
    console.error("Error deleting position:", error);
    throw error;
  }
};

// Retrieve all positions created by an organization!
export const getPositionsByOrg = (
  oid: string,
  onUpdate: (positions: Position[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/positions`),
    where("oid", "==", oid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const positions = querySnapshot.docs.map(doc => 
      doc.data() as Position
    );
    onUpdate(positions);
  });
};

// Retrieves all of the applicants for a position!
export const getApplicantsByPosition = (
  pid: string,
  onUpdate: (applications: Applicant[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/applications`),
    where("pid", "==", pid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const applications = querySnapshot.docs.map(doc => 
      doc.data() as Applicant
    );
    onUpdate(applications);
  });
};

// Update status of an applicant for a position!
export const setApplicationStatus = async (uid: string, status: "accepted" | "rejected") => {
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
        status
      });
      return true;
    } else {
      throw new Error("Applicant not found");
    }
  } catch (error) {
    console.error(`Error updating applicant status to ${status}:`, error);
    throw error;
  }
};

// Update bookmark status of an applicant for a position!
export const toggleBookmarkStatus = async (uid: string) => {
  try {
    const app = initializeFirebase();
    const firestore = getFireStore(true);

    const q = query(
      collection(firestore, "applications"),
      where("uid", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const applicantDoc = querySnapshot.docs[0];
    
    if (applicantDoc) {
      const currentData = applicantDoc.data();
      await updateDoc(doc(firestore, "applications", applicantDoc.id), {
        bookMark: !currentData.bookMark
      });
    } else {
      throw new Error("Applicant not found");
    }
  } catch (error) {
    console.error("Error toggling applicant bookmark:", error);
    throw error;
  }
};