"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { initializeFirebase, getUserAuth } from "@/utils/databaseFunctions";
import { getUser } from "@/utils/userFunctions";

type UserContextType = {
  user: null | undefined | DocumentData;
  userData: null | undefined | DocumentData;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propNames: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);

  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [userData, setUserData] = useState<DocumentData | undefined | null>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getUser(firebaseUser.uid);
        setUserData(userDoc);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();

  }, [auth]);

  const value = {
    user,
    userData
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
