"use client";

import { useAccount } from "@/providers/AccountProvider";

const Header = () => {
  const { accountData } = useAccount();

  return (
    <section className="w-full flex justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600">
      <div className="default-container py-12 w-full flex items-center max-md:py-10">
        <h3 className="default-heading text-white">
          Welcome Back, {accountData?.fullName}
        </h3>
      </div>
    </section>
  );
}

export default Header