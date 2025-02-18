"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { initializeFirebase } from "@/utils/firebaseFunctions";
import { useAccount } from "./AccountProvider";

import Loader from "@/components/common/Loader";

// Undefined -> Loading
// Null -> Not Logged In!

const AuthRouter = (props: any) => {
  const { account, accountData } = useAccount();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    // Initial Auth Check
    if (account === undefined || accountData === undefined) {
      return;
    }

    // Case 1: Not Logged In
    if (!account) {
      if (pathName !== "/") {
        router.push("/");
      }
      return;
    }

    // Case 2: Logged In & Not Registered
    if (account && accountData === null) {
      if (pathName !== "/register") {
        router.push("/register");
      }
      return;
    }

    // Case 3: Logged In & Registered
    if (account && accountData) {
      // Prevent access to home and register pages
      if (pathName === "/" || pathName === "/register") {
        const dashboardPath = accountData.type === "organization" 
          ? "/organization-dashboard?page=manage-positions"
          : "/applicant-dashboard?page=positions";
        router.push(dashboardPath);
        return;
      }

      // Prevent Accessing Wrong Dashboard
      if (accountData.type === "organization" && pathName === "/applicant-dashboard") {
        router.push("/organization-dashboard");
        return;
      }
      if (accountData.type === "individual" && pathName === "/organization-dashboard") {
        router.push("/applicant-dashboard");
        return;
      }
    }
  }, [account, accountData, pathName, router]);

  // Loader During Authentication
  if (account === undefined || accountData === undefined) {
    return (<Loader />)
  }

  return <>{props.children}</>;
};

export default AuthRouter;