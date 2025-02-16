import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, deleteDoc, where } from "firebase/firestore";
import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";
import { updateOpenSlots } from "./globalFunctions";
import { Application, Position } from "../data/types";

export const addPosition = async (positionData: Partial<Position>) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    await addDoc(collection(firestore, "positions"), {
      ...positionData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating position:", error);
    throw error;
  }
};

export const deletePosition = async (pid: string) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);
  
  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const q = query(collection(firestore, "positions"), where("pid", "==", pid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Position not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting position:", error);
    throw error;
  }
};

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

export const getApplicantsByPosition = (
  pid: string,
  onUpdate: (applications: Application[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, `/applications`),
    where("pid", "==", pid)
  );

  return onSnapshot(q, (querySnapshot) => {
    const applications = querySnapshot.docs.map(doc => 
      doc.data() as Application
    );
    onUpdate(applications);
  });
};

////////////////////////////////
////////////////////////////////

// Updates .visible (true OR false)!
export const updateVisibility = async (pid: string, visible: boolean) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);
  
  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const q = query(collection(firestore, "positions"), where("pid", "==", pid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Position not found");
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, { visible });
    return true;
  } catch (error) {
    console.error("Error updating position visibility:", error);
    throw error;
  }
};

interface ApplicationStatusUpdate {
  ////////////
  uid: string;
  status: "accepted" | "rejected";
  ////////////
  email: string;
  fullName: string;
  positionTitle: string;
  organizationName: string;
}

// Accept OR reject an applicant!
// .status = "accepted" OR .status = "rejected"
// if (status = "accepted") .openSlots - 1
export const setApplicationStatus = async ({
  ////////////
  uid,
  status,
  ////////////
  email,
  fullName,
  positionTitle,
  organizationName
}: ApplicationStatusUpdate): Promise<boolean> => {
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
        status,
        updatedAt: serverTimestamp()
      });

      if (status === "accepted") {
        // .openSlots - 1
        await updateOpenSlots(applicantDoc.data().pid, -1);
      }

      // EMAIL Notification
      const { sendEmail } = await import('./emailFunctions');
      
      const emailBody = status === "accepted" 
        ? `Congratulations! We are pleased to inform you that your application for the ${positionTitle} position at ${organizationName} has been accepted. We will be in touch shortly with next steps.`
        : `Thank you for your interest in the ${positionTitle} position at ${organizationName}. After careful consideration, we regret to inform you that we have decided to move forward with other candidates. We appreciate your time and effort in applying.`;

      await sendEmail({
        to: email,
        subject: `Application Status Update for ${positionTitle} at ${organizationName}`,
        body: emailBody,
        recipientName: fullName
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

// Updates .bookMark (!bookMark)!
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

// RESCINDS an applicant's offer!
// .rescinded = true
// .openSlots + 1
export const rescindApplicant = async ({
  uid,
  email,
  fullName,
  positionTitle,
  organizationName,
  pid
}: Omit<ApplicationStatusUpdate, 'status'> & { pid: string }): Promise<boolean> => {
  try {
    const firestore = getFireStore(true);
    const q = query(
      collection(firestore, "applications"),
      where("uid", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const applicantDoc = querySnapshot.docs[0];
    
    if (!applicantDoc) {
      throw new Error("Application not found");
    }

    // .rescinded = true!
    await updateDoc(doc(firestore, "applications", applicantDoc.id), {
      rescinded: true
    });

    // .openSlots + 1
    await updateOpenSlots(pid, 1);

    // EMAIL Notification
    const { sendEmail } = await import('./emailFunctions');
    await sendEmail({
      to: email,
      subject: `Your Acceptance for ${positionTitle} Has Been Rescinded`,
      body: `Dear ${fullName},\n\nWe regret to inform you that your acceptance for the ${positionTitle} position at ${organizationName} has been rescinded due to no response within the 3-day acceptance period.\n\nIf you believe this is a mistake or would like to discuss this further, please contact the organization directly.\n\nBest regards,\nMira Team`,
      recipientName: fullName
    });

    return true;
  } catch (error) {
    console.error("Error rescinding application:", error);
    throw error;
  }
};
