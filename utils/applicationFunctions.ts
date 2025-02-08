import { DocumentData, query, collection, onSnapshot, where, addDoc, serverTimestamp, doc, updateDoc, increment, getDocs } from "firebase/firestore";
import { initializeFirebase, getUserAuth, getFireStore } from "./databaseFunctions";
import { Applicant } from "../data/types";

// Adds a new application to the database
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

// Updates the status of an applicant to accepted or rejected
export const updateApplicantStatus = async (uid: string, status: "accepted" | "rejected") => {
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

// Updates the commitment status of an applicant
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

// Toggles the bookmark status of an applicant
export const toggleApplicantBookmark = async (uid: string) => {
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

// Retrieves all applications for a specific user 
export const getUserApplications = (
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