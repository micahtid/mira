"use client";

import { useUser } from "@/providers/UsersProvider";
import { signOut } from "@/utils/databaseFunctions";

import Registration from "./components/Registration";
import Login from "./components/Login";

import OrganizationDashboard from "./components/OrganizationDashboard/OrganizationDashboard";
import ApplicationDashboard from "./components/ApplicantDashboard/ApplicationDashboard";

const Dashboard = () => {
  const { user, userData } = useUser();

  if (!user && !userData) {
    return (<Login />)
  }

  if (user && !userData) {
    return (<Registration />)
  }

  return (
    <div className="default-container flex flex-col gap-4">
      <h3 className="default-heading">Dashboard</h3>
      <button onClick={signOut} className="default-button">Log Out</button>

      { userData?.type === "organization" ? <OrganizationDashboard /> : <ApplicationDashboard /> }
    </div>
  )
}

export default Dashboard