"use client";

// React and Next.js imports
import { useState } from "react";
import Link from "next/link";

// Motion imports
import { motion } from "framer-motion";

// Component imports
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";
import VideoDemo from "@/components/landing-page/VideoDemo";
import Pricing from "@/components/landing-page/Pricing";
import FAQ from "@/components/landing-page/FAQ";
import CTA from "@/components/landing-page/CTA";
import Footer from "@/components/landing-page/Footer";

// Icons
import { Home as HomeIcon, Book, MessageCircle, LogIn } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";
import { signIn } from "@/utils/firebaseFunctions";


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", url: "/#home", icon: HomeIcon },
    { name: "Platform", url: "#platform", icon: Book },
    { name: "Contact", url: "#contact", icon: MessageCircle },
    { name: "Sign In", url: "#", icon: LogIn, onClick: signIn },
  ];

  return (
    <main>
      <div className="relative min-h-screen antialiased max-[315px]:hidden">
        {/* Floating Navbar */}
        <div className="fixed bottom-0 sm:top-6 left-1/2 -translate-x-1/2 z-50 mb-4 sm:mb-6 min-h-fit w-[95%] sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-3 bg-white/10 border border-primary-100/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
                  className={cn(
                    "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-6 py-2 rounded-full transition-colors flex-1 sm:flex-auto text-center",
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
        
        {/* Content */}
        <div className="relative pt-24">
          <Hero />
          <Features />
          <VideoDemo />
          <Pricing />
          <FAQ />
          <CTA />
          <Footer />
        </div>
      </div>
      <div className="hidden max-[350px]:block p-4">
        <p className="default-text">Please visit our website on a larger device.</p>
      </div>
    </main>
  );
};

export default HomePage;