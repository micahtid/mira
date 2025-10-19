"use client";

import { useSearchParams } from "next/navigation";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import Header from "./components/Header";
import { FiBriefcase, FiList, FiSettings } from "react-icons/fi";

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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-white">
      <Header />
      <DashboardNavBar items={[
        { label: "Manage Positions", link: "manage-positions", icon: <FiBriefcase /> },
        { label: "View Listings", link: "positions", icon: <FiList /> },
        { label: "Settings", link: "account-settings", icon: <FiSettings /> }
      ]} />
      <div className="md:pl-[80px] min-h-screen">
        <div className="default-container w-full flex flex-col gap-6 py-8 px-6 md:px-12 mb-36">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default OrganizationDashboard