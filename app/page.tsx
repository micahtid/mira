"use client";

// React and Next.js imports
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Motion imports
import { motion, Variants, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Component imports
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";
import VideoDemo from "@/components/landing-page/VideoDemo";
import Pricing from "@/components/landing-page/Pricing";
import FAQ from "@/components/landing-page/FAQ";
import CTA from "@/components/landing-page/CTA";
import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";

// Icons
import { Home as HomeIcon, Book, Users, MessageCircle, LogIn } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";
import { signIn } from "@/utils/firebaseFunctions";

// Animation variants
const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 30, stiffness: 400 }
  }
};

const navFade: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  rotate: [-1, 1, -1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Add new animation variants for tabs
const tabVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 300 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { type: "spring", damping: 20, stiffness: 300 }
  }
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Optimize animation variants based on device capabilities
  const optimizedFadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 30, stiffness: 400 }
    }
  };

  const navItems = [
    { name: "Home", url: "/", icon: HomeIcon },
    { name: "Platform", url: "#platform", icon: Book },
    { name: "About Us", url: "#about", icon: Users },
    { name: "Contact", url: "#contact", icon: MessageCircle },
    { name: "Sign In", url: "#", icon: LogIn, onClick: signIn },
  ];

  return (
    <main className="relative min-h-screen antialiased">
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

      {/* Enhanced global background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main gradients */}
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.2),transparent_70%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-100),0.2),transparent_70%)]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.2 }
          }}
          className="absolute top-20 left-[20%] w-64 h-64 rounded-full bg-primary-100/10 blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.7 }
          }}
          className="absolute bottom-40 right-[15%] w-96 h-96 rounded-full bg-primary-200/10 blur-3xl"
        />
      </div>

      {/* Floating Navbar */}
      <div className="fixed bottom-0 sm:top-6 left-1/2 -translate-x-1/2 z-50 mb-6">
        <div className="flex items-center gap-3 bg-white/10 border border-primary-100/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
    </main>
  );
};

export default HomePage;