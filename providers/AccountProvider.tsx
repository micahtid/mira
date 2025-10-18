"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Auth, User } from "firebase/auth";
import { initializeFirebase, getUserAuth } from "@/utils/firebaseFunctions";
import { getAccount } from "@/utils/globalFunctions";
import { getPremiumStatus } from "@/utils/stripeFunctions";

type AccountContextType = {
  account: null | undefined | DocumentData;
  accountData: null | undefined | DocumentData;
  isPremium: boolean;
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
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Both states as undefined while fetching data!
        const userDoc = await getAccount(firebaseUser.uid);

        // Update both states at once to prevent flashing!
        setAccount(firebaseUser);
        setAccountData(userDoc);
        
        // Check premium status for organizations
        if (userDoc && (userDoc as DocumentData).type === "organization") {
          try {
            const premiumStatus = await getPremiumStatus();
            setIsPremium(premiumStatus);
          } catch (error) {
            console.error("Error checking premium status:", error);
            setIsPremium(false);
          }
        } else {
          setIsPremium(false);
        }
      } else {
        // Update all states during logout...
        setAccount(null);
        setAccountData(null);
        setIsPremium(false);
      }
    });

    return () => unsubscribe();

  }, [auth]);

  const value = {
    account,
    accountData,
    isPremium
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
