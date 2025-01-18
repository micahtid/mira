"use client";

import { useUser } from "@/providers/UsersProvider";

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
    <div>
      Dashboard!
    </div>
  )
}

export default Dashboard