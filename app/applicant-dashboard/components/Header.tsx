"use client";

import { motion } from "framer-motion";
import { useAccount } from "@/providers/AccountProvider";

const Header = () => {
  const { accountData } = useAccount();

  return (
    <section className="relative w-full flex justify-center items-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 overflow-hidden md:pl-[80px]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

      <div className="default-container py-16 px-6 md:px-12 w-full flex items-center max-md:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="default-heading text-white font-sora tracking-tight">
            Welcome Back, {accountData?.fullName}
          </h3>
          <p className="default-text text-white/80 mt-2">
            Ready to explore new opportunities?
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Header