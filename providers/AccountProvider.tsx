"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { initializeFirebase, getUserAuth } from "@/utils/databaseFunctions";
import { getUser } from "@/utils/userFunctions";

type AccountContextType = {
  account: null | undefined | DocumentData;
  accountData: null | undefined | DocumentData;
};

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export interface Props {
  [propNames: string]: any;
}

export const AccountContextProvider = (props: Props) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);

  const [account, setAccount] = useState<User | undefined | null>(undefined);
  const [accountData, setAccountData] = useState<DocumentData | undefined | null>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAccount(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getUser(firebaseUser.uid);
        setAccountData(userDoc);
      } else {
        setAccountData(null);
      }
    });

    return () => unsubscribe();

  }, [auth]);

  const value = {
    account,
    accountData
  };

  return <AccountContext.Provider value={value} {...props} />;
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
