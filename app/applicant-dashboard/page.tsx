"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import PositionListing from "@/components/dashboard/PositionListing";

import AccountSettings from "./components/AccountSettings";
import ActiveApplications from "./components/ActiveApplications";

import { signOut } from "@/utils/firebaseFunctions";

const ApplicantDashboard = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "positions";

  const renderContent = () => {
    switch (currentPage) {
      case "positions":
        return <PositionListing allowApply={true} />;
      case "active-applications":
        return <ActiveApplications />;
      case "account-settings":
        return <AccountSettings />;
    }
  };

  return (
    <div className="default-container w-full flex flex-col gap-6">
      <DashboardNavBar items={[
        { label: "View Listings", link: "positions" }, 
        { label: "Active Applications", link: "active-applications" },
        { label: "Settings", link: "account-settings" }
      ]} />
      
      <h3 className="default-heading">Dashboard</h3>
      <button onClick={() => signOut()} className="default-button">Log Out</button>

      <div className="">
        {renderContent()}
      </div>
    </div>
  );
};

export default ApplicantDashboard;