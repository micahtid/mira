"use client";

import { signOut } from "@/utils/databaseFunctions";

import Accordian from "@/components/Accordian"

import Login from "@/components/Login";

const Home = () => {
  return (
    <div className="default-container flex flex-col gap-4">
      <h3 className="default-heading">This is Mira</h3>
      <p className="default-text">We&apos;ll help you connect!</p>
      <button onClick={signOut} className="default-button">
        Log Out
      </button>
      <Accordian title="What is Mira?" content="This is a test!" />

      <Login />
    </div>
  )
}

export default Home