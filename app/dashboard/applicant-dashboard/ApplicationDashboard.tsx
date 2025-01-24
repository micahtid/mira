"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavBar from "../components/DashboardNavBar";

import AccountSettings from "./components/AccountSettings";
import ActiveApplications from "./components/ActiveApplications";
import PositionListing from "../components/PositionListing";

const ApplicationDashboard = () => {
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
    <div className="w-full flex flex-col gap-6">
      <DashboardNavBar items={[
        { label: "View Listings", link: "positions" }, 
        { label: "Active Applications", link: "active-applications" },
        { label: "Settings", link: "account-settings" }
      ]} />
      
      <div className="">
        {renderContent()}
      </div>
    </div>
  );
};

export default ApplicationDashboard;