import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, increment } from "firebase/firestore";
import { getFireStore, getUserAuth, initializeFirebase } from "./firebaseFunctions";
import { incrementCommittedApplicants, updateOpenSlots } from "./globalFunctions";
import { Application, Position } from "../data/types";

// RETURN: Single position based on PID.
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

// RETURN: Single application based on UID & PID.
export const getApplication = (
  uid: string, 
  pid: string,
  onUpdate: (application: Application | null) => void
) => {
  const firestore = getFireStore(true);
  const applicationsRef = collection(firestore, "applications");
  
  const q = query(
    applicationsRef,
    where("uid", "==", uid),
    where("pid", "==", pid)
  );

  return onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
      onUpdate(null);
      return;
    }
    onUpdate(querySnapshot.docs[0].data() as Application);
  });
};

export const addApplication = async (applicationData: Partial<Application>) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const { uid } = auth.currentUser;
    await addDoc(collection(firestore, "applications"), {
      // uid,
      ...applicationData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

// Increment .totalApplicants!
export const incrementTotalApplicants = async (pid: string) => {
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
      totalApplicants: increment(1)
    });
    
    return true;
  } catch (error) {
    console.error("Error incrementing position count:", error);
    throw error;
  }
};

export const getApplicationsByUser = (
  uid: string,
  onUpdate: (applications: Application[]) => void
) => {
  const app = initializeFirebase();
  const firestore = getFireStore(true);

  const q = query(
    collection(firestore, "applications"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, async (querySnapshot) => {
    // Retrieve all applications!
    const applications = querySnapshot.docs.map(doc => 
      doc.data() as Application
    );
    
    // For each application, get position data!
    const applicationsWithPositions = await Promise.all(
      applications.map(async (application) => {
        try {
          const positionQuery = query(
            collection(firestore, "positions"),
            where("pid", "==", application.pid)
          );
          
          const positionSnapshot = await getDocs(positionQuery);
          
          if (!positionSnapshot.empty) {
            const positionData = positionSnapshot.docs[0].data();
            // Merge position & applicant data!
            return {
              ...application,
              positionTitle: positionData.positionTitle,
              positionType: positionData.positionType,
              organizationName: positionData.organizationName
            };
          }
          
          return application;
        } catch (error) {
          console.error("Error fetching position for application:", error);
          return application;
        }
      })
    );
    
    onUpdate(applicationsWithPositions);
  });
};

// When an applicant COMMITS or WITHDRAWS from a position!
// Only when .status == "accepted"!
export const setApplicantCommitment = async (uid: string, isCommitted: boolean) => {
  try {
    const firestore = getFireStore(true);
    const q = query(
      collection(firestore, "applications"),
      where("uid", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const applicantDoc = querySnapshot.docs[0];
    
    if (!applicantDoc) {
      throw new Error("Applicant not found");
    }

    const application = applicantDoc.data() as Application;
    
    ///////////////////////
    await updateDoc(doc(firestore, "applications", applicantDoc.id), {
      committed: isCommitted
    });

    if (!isCommitted) {
      // .openSlots + 1
      await updateOpenSlots(application.pid, 1);
    } else {
      // .committedApplicants + 1
      await incrementCommittedApplicants(application.pid);
    }

    ///////////////////////
    const positionQuery = query(
      collection(firestore, "positions"),
      where("pid", "==", application.pid)
    );
    const positionSnapshot = await getDocs(positionQuery);
    
    if (positionSnapshot.empty) {
      throw new Error("Position not found");
    }
    
    const position = positionSnapshot.docs[0].data() as Position;

    ///////////////////////
    const { sendEmail } = await import('./emailFunctions');
    
    const emailBody = isCommitted
      ? `${application.fullName} has accepted their offer for the ${position.positionTitle}. They will be joining your team!`
      : `${application.fullName} has withdrawn their acceptance for the ${position.positionTitle}.`;

    if (!position.organizationEmail) {
      console.error("Organization email not found for position:", position);
      return true;
    }

    await sendEmail({
      to: position.organizationEmail,
      subject: `Application Update: ${position.positionTitle}`,
      body: emailBody,
      recipientName: position.organizationName
    });

    return true;
  } catch (error) {
    console.error("Error updating applicant commitment:", error);
    throw error;
  }
};
