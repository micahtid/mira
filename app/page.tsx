"use client";

import { signIn, signOut } from "@/utils/firebaseFunctions";

const Home = () => {
  return (
    <div className="default-container py-12">
      <h3 className="default-heading">Mira</h3>
      <div className="flex gap-4 justify-start mt-8">
        <button onClick={signIn} className="default-button">
          Sign In
        </button>
        <button onClick={signOut} className="default-button">
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Home;