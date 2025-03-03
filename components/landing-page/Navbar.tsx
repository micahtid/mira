import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { FiHome, FiSearch, FiHeart, FiUser } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const navItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Browse", icon: FiSearch, url: "/browse" },
  { name: "Impact", icon: FiHeart, url: "/impact" },
  { name: "Profile", icon: FiUser, url: "#", onClick: signIn }
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <>
      {/* Fixed Logo in top-left corner */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </Link>
      </div>

      {/* Floating Navbar */}
      <div className="fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6">
        <div className="flex items-center gap-3 bg-white/5 border border-primary-100/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  setActiveTab(item.name);
                }}
                className={twMerge(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-gray-600 hover:text-primary-500",
                  isActive && "bg-primary-50/50 text-primary-500"
                )}
              >
                <span className="hidden md:inline font-poppins">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary-50/30 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary-500/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary-500/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary-500/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar; 