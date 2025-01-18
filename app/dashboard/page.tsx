"use client";

import { useUser } from "@/providers/UsersProvider";
import { signOut } from "@/utils/databaseFunctions";

import Registration from "./components/Registration";
import Login from "./components/Login";

const Dashboard = () => {
  const { user, isRegistered } = useUser();

  console.log(user, isRegistered);

  if (!user && !isRegistered) {
    return (<Login />)
  }

  if (user && !isRegistered) {
    return (<Registration />)
  }

  return (
    <div className="default-container flex flex-col gap-4">
      <h3 className="default-heading">Dashboard</h3>
      <button onClick={signOut} className="default-button">Log Out</button>
    </div>
  )
}

export default Dashboard