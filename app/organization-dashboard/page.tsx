"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import Header from "./components/Header";

import ManagePositions from "./components/ManagePositions";
import PositionListing from "@/components/dashboard/position-listing/PositionListing";
import AccountSettings from "./components/AccountSettings";

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
    <>
      <Header />
      <div className="default-container w-full flex flex-col gap-6">
        <DashboardNavBar items={[
          { label: "Manage Positions", link: "manage-positions" }, 
          { label: "View Listings", link: "positions" },
          { label: "Settings", link: "account-settings" }
        ]} />
        <div className="default-content">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default OrganizationDashboard