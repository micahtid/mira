"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavBar from "@/components/DashboardNavBar";

import ManagePositions from "./components/ManagePositions";
import PositionListing from "@/components/PositionListing";
import AccountSettings from "./components/AccountSettings";

import { signOut } from "@/utils/databaseFunctions";

const OrganizationDashboard = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "manage-positions";

  const renderContent = () => {
    switch (currentPage) {
      case "manage-positions":
        return <ManagePositions />;
      case "positions":
        return <PositionListing />;
      case "account-settings":
        return <AccountSettings />;
    }
  };

  return (
    <div className="default-container w-full flex flex-col gap-6">
      <DashboardNavBar items={[
        { label: "Manage Positions", link: "manage-positions" }, 
        { label: "View Listings", link: "positions" },
        { label: "Settings", link: "account-settings" }
      ]} />

      <h3 className="default-heading">Dashboard</h3>
      <button onClick={() => signOut()} className="default-button">Log Out</button>
      
      <div className="default-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default OrganizationDashboard