"use client";

import { signIn } from "@/utils/firebaseFunctions";
import { motion, Variants, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  FiArrowRight, FiUsers, FiAward, FiHeart, 
  FiCheck, FiMail, FiClock, FiMapPin,
  FiGlobe, FiMessageCircle, FiShield,
  FiMenu, FiX, FiChevronDown, FiList
} from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home as HomeIcon, Book, Users, MessageCircle, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { 
  UsersIcon, 
  AwardIcon, 
  HeartIcon, 
  ClockIcon, 
  MessageSquareIcon, 
  ShieldIcon 
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import Image from "next/image";

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

// Typography system update
const typography = {
  h1: "font-poppins text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight",
  h2: "font-poppins text-4xl lg:text-5xl font-semibold leading-tight",
  h3: "font-poppins text-2xl lg:text-3xl font-semibold leading-snug",
  h4: "font-poppins text-xl font-semibold leading-snug",
  body: "font-poppins text-lg text-gray-600 leading-relaxed max-lg:text-base",
  small: "font-poppins text-sm text-gray-500 leading-relaxed",
  label: "font-poppins text-base text-gray-700 font-medium max-lg:text-sm"
};

// Updated gradient system
const gradients = {
  primary: "bg-gradient-to-br from-primary-50 via-primary-50/50 to-white",
  secondary: "bg-gradient-to-b from-white to-primary-50/20",
  accent: "bg-gradient-to-br from-primary-100/40 to-primary-50/20",
  card: "bg-white/90 backdrop-blur-sm"
};

// Spacing system
const spacing = {
  section: "py-16 lg:py-24",
  container: "px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
  content: "space-y-6",
};

// Component styles
const components = {
  card: "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-primary-100/10",
  button: {
    primary: "px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300",
    secondary: "px-6 py-3 bg-white text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 transition-colors duration-300"
  },
  input: "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", url: "/", icon: HomeIcon },
    { name: "Platform", url: "#platform", icon: Book },
    { name: "About Us", url: "#about", icon: Users },
    { name: "Contact", url: "#contact", icon: MessageCircle },
    { name: "Sign In", url: "#", icon: LogIn, onClick: signIn },
  ];

  return (
    <main className="min-h-screen relative antialiased">
      {/* Fixed Logo in top-left corner */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Mira Logo"
            width={80}
            height={80}
            className="rounded-xl"
          />
        </Link>
      </div>

      {/* Enhanced global background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.2),transparent_70%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-100),0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-100),0.3),transparent_70%)]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-[15%] left-[10%] w-64 h-64 rounded-2xl bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl"
            style={{ transformOrigin: "center center" }}
          />
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 0.5 }
            }}
            className="absolute top-[60%] right-[5%] w-80 h-80 rounded-2xl bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl"
            style={{ transformOrigin: "center center" }}
          />
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
            className="absolute bottom-[20%] left-[15%] w-72 h-72 rounded-2xl bg-gradient-to-br from-primary-300/20 to-primary-100/10 backdrop-blur-sm border border-primary-200/20 shadow-xl"
            style={{ transformOrigin: "center center" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            {/* Status Badge */}
            <motion.div 
              variants={fadeInScale}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary-100/80 backdrop-blur-sm text-primary-600 text-sm font-medium shadow-lg border border-primary-200/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                Connecting Students with Meaningful Volunteer Opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              variants={fadeIn}
              className="space-y-6"
            >
              <h1 className={`${typography.h1} text-gray-900 flex flex-col items-center justify-center space-y-4`}>
                <span>Find Your Perfect</span>
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.98, 1, 0.98]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative inline-block"
                >
                  <span className="relative z-10 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 bg-clip-text text-transparent bg-[size:200%_100%] animate-gradient">
                    Volunteer Position
                  </span>
                  <div className="absolute inset-0 bg-primary-100/20 blur-3xl rounded-full transform scale-150 opacity-50" />
                </motion.span>
              </h1>
              <p className={`${typography.body} text-xl lg:text-2xl max-w-2xl mx-auto text-gray-600`}>
                The platform connecting high school students with youth nonprofits for meaningful volunteer opportunities.
              </p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-6 justify-center mt-12"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signIn}
                className="group relative px-8 py-4 bg-primary-500 text-white rounded-xl text-lg font-medium overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Browse Positions
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-primary-500 border-2 border-primary-500 rounded-xl text-lg font-medium overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-100),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Post a Position</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Social Proof */}
            <motion.div 
              variants={fadeIn}
              className="flex items-center justify-center gap-12 mt-16"
            >
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="w-14 h-14 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-primary-50 shadow-lg cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
                    </motion.div>
                  ))}
                </div>
                <p className={`${typography.body} font-medium`}>
                  Trusted by <span className="font-bold text-gray-900">100+</span> nonprofits
                  <br />and <span className="font-bold text-gray-900">1,000+</span> students
                </p>
              </div>
              <div className="h-12 w-px bg-primary-200/30" />
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiAward key={i} className="w-6 h-6 text-primary-400" />
                  ))}
                </div>
                <p className={`${typography.body} font-medium`}>
                  Over <span className="font-bold text-gray-900">10,000+</span> volunteer hours tracked
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.2),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="relative default-container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
            >
              Platform Features
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${typography.h2} mb-4 text-black whitespace-nowrap`}
            >
              <span className="relative inline-block">
                Streamlined Volunteer Management
                <motion.svg
                  width="100%"
                  height="8"
                  viewBox="0 0 100 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 99 7.5 99 5.5"
                    stroke="rgb(109, 81, 251)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                </motion.svg>
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`${typography.body} text-gray-600 mb-12`}
            >
              Everything you need to manage volunteer positions and track impact, all in one place.
            </motion.p>
          </motion.div>

          <BentoGrid className="max-w-6xl mx-auto">
            {[
              {
                name: "For Nonprofits",
                className: "md:col-span-2",
                Icon: UsersIcon,
                description: "Easily create and manage volunteer positions, track applications, and communicate with volunteers.",
                features: ["Post unlimited positions", "Track applications", "Verify volunteer hours", "Generate reports"],
                href: "/nonprofits",
                cta: "Post a Position",
                background: "from-primary-50/50 to-primary-100/30"
              },
              {
                name: "For Students",
                className: "md:col-span-1",
                Icon: AwardIcon,
                description: "Browse volunteer positions that match your interests and schedule.",
                features: ["Smart matching", "Hour tracking", "Digital certificates", "Mobile app"],
                href: "/students",
                cta: "Browse Positions",
                background: "from-primary-100/30 to-primary-50/50"
              },
              {
                name: "Track Impact",
                className: "md:col-span-1",
                Icon: HeartIcon,
                description: "Track volunteer hours and generate impact reports.",
                features: ["Real-time tracking", "Impact metrics", "Custom reports", "Data insights"],
                href: "/impact",
                cta: "Learn More",
                background: "from-primary-50/40 to-primary-100/20"
              },
              {
                name: "Time Management",
                className: "md:col-span-2",
                Icon: ClockIcon,
                description: "Flexible scheduling and automated time tracking for both students and organizations.",
                features: ["Calendar integration", "Automated reminders", "Schedule conflicts", "Time verification"],
                href: "/time-tracking",
                cta: "Explore Features",
                background: "from-primary-100/20 to-primary-50/40"
              },
              {
                name: "Communication",
                className: "md:col-span-2",
                Icon: MessageSquareIcon,
                description: "Built-in messaging system for seamless coordination between volunteers and organizations.",
                features: ["Real-time chat", "File sharing", "Group messaging", "Mobile notifications"],
                href: "/messaging",
                cta: "Start Chatting",
                background: "from-primary-50/30 to-primary-100/40"
              },
              {
                name: "Safety & Verification",
                className: "md:col-span-1",
                Icon: ShieldIcon,
                description: "Robust verification system for nonprofits and volunteer hour tracking.",
                features: ["ID verification", "Background checks", "Hour validation", "Secure data"],
                href: "/safety",
                cta: "Learn More",
                background: "from-primary-100/40 to-primary-50/30"
              }
            ].map((feature, index) => (
              <BentoCard
                key={feature.name}
                name={feature.name}
                className={feature.className}
                Icon={feature.Icon}
                description={feature.description}
                href={feature.href}
                cta={feature.cta}
                background={
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.background}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                }
              >
                <motion.ul 
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    animate: {
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="mt-4 space-y-2"
                >
                  {feature.features.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        initial: { opacity: 0, x: -10 },
                        animate: { 
                          opacity: 1, 
                          x: 0,
                          transition: { duration: 0.3 }
                        }
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary-50 flex items-center justify-center">
                        <FiCheck className="w-2.5 h-2.5 text-primary-500" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </BentoCard>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
            style={{ transformOrigin: "center center" }}
          />
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 0.5 }
            }}
            className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
            style={{ transformOrigin: "center center" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
            >
              Simple Pricing
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${typography.h2} mb-4 text-black`}
            >
              <span className="relative inline-block">
                Choose the Right Plan
                <motion.svg
                  width="100%"
                  height="8"
                  viewBox="0 0 100 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 99 7.5 99 5.5"
                    stroke="rgb(109, 81, 251)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                </motion.svg>
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`${typography.body} max-w-2xl mx-auto text-black/80`}
            >
              Flexible plans for nonprofits of all sizes. Students can browse and apply for free.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl bg-white border border-primary-100/20 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-white rounded-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-semibold text-black">Student</h3>
                    <p className="font-poppins text-sm text-black/70">Perfect for high school volunteers</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-poppins text-4xl font-bold text-black">Free</span>
                    <span className="font-poppins text-lg text-black/70">forever</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Browse all positions</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Track volunteer hours</span>
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={signIn}
                  className="group relative w-full py-3 px-6 rounded-xl bg-white border-2 border-primary-500 text-primary-500 font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-100),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl border-2 border-primary-500 bg-white p-8 shadow-xl transform-gpu transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white rounded-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.5),transparent_70%)] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <FiAward className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-semibold text-black">Nonprofit Pro</h3>
                    <p className="font-poppins text-sm text-black/70">For growing organizations</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-poppins text-4xl font-bold text-black">$29</span>
                    <span className="font-poppins text-lg text-black/70">/month</span>
                  </div>
                  <p className="text-sm text-primary-500 mt-1">Save 20% with annual billing</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Unlimited positions</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Advanced analytics</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Email notifications</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Priority support</span>
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={signIn}
                  className="group relative w-full py-3 px-6 rounded-xl bg-primary-500 text-white font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Trial
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl bg-white border border-primary-100/20 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-white rounded-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <FiGlobe className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins text-xl font-semibold text-black">Enterprise</h3>
                    <p className="font-poppins text-sm text-black/70">For large organizations</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-poppins text-4xl font-bold text-black">Custom</span>
                    <span className="font-poppins text-lg text-black/70">pricing</span>
                  </div>
                  <p className="text-sm text-primary-500 mt-1">Tailored to your needs</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Everything in Pro</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Custom integration</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">Dedicated support</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">SLA agreement</span>
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = "mailto:contact@mira.com"}
                  className="group relative w-full py-3 px-6 rounded-xl bg-white border-2 border-primary-500 text-primary-500 font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-100),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contact Sales
                    <FiMail className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Feature Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="font-poppins text-base text-gray-600 mb-4">
              Need help choosing? Compare all features
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors duration-200 font-medium"
            >
              <FiList className="w-5 h-5" />
              View Full Comparison
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
            style={{ transformOrigin: "center center" }}
          />
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 0.5 }
            }}
            className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
            style={{ transformOrigin: "center center" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
            >
              FAQ
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className={`${typography.h2} mb-4 text-black whitespace-nowrap`}>
                <span className="relative inline-block">
                  Common Questions
                  <motion.svg
                    width="100%"
                    height="8"
                    viewBox="0 0 100 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 left-0 w-full"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 99 7.5 99 5.5"
                      stroke="rgb(109, 81, 251)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    />
                  </motion.svg>
                </span>
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`${typography.body} max-w-2xl mx-auto text-black/80 mb-12`}
            >
              Everything you need to know about the platform and how it works.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Decorative Elements */}
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl" />
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl" />
            
            {/* FAQ Content */}
            <div className="relative backdrop-blur-sm rounded-2xl border border-primary-200/20 bg-white/80 p-6 md:p-8">
              <Accordion
                items={[
                  {
                    question: "How do I post a volunteer position?",
                    answer: "Sign up for a nonprofit account, complete your organization profile, and click 'Post a Position' to create your first listing. Our intuitive interface makes it easy to specify requirements, schedules, and other important details."
                  },
                  {
                    question: "Is it free for students?",
                    answer: "Yes! Students can browse positions, create profiles, and track their volunteer hours completely free. We believe in making volunteering accessible to all students, which is why we'll never charge students for using our platform."
                  },
                  {
                    question: "How do you verify nonprofits?",
                    answer: "We verify all nonprofit organizations through an application process, where we check for legitimacy and ensure the organization is a legitimate business."
                  },
                  {
                    question: "Can I track volunteer hours?",
                    answer: "Yes, both students and organizations can track volunteer hours through our platform with our built-in time tracking system. The system includes features like real-time tracking, activity logs, and automated reporting to make hour tracking seamless and accurate."
                  },
                  {
                    question: "What kind of support do you offer?",
                    answer: "We provide comprehensive support through multiple channels including email, chat, and phone. Pro and Enterprise users get priority support with dedicated response times. We also offer extensive documentation and video tutorials."
                  }
                ]}
              />
            </div>

            {/* Contact Support Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="font-poppins text-base text-gray-600 mb-4">
                Still have questions?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "mailto:contact@mira.com"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors duration-200 font-medium"
              >
                <FiMail className="w-5 h-5" />
                Contact Support
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Floating Elements */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
              style={{ transformOrigin: "center center" }}
            />
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.5 }
              }}
              className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
              style={{ transformOrigin: "center center" }}
            />

            {/* Main Content Card */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-sm border border-primary-200/20 bg-white/80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white" />
              <div className="relative px-8 py-16 sm:p-16 md:p-20">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
                  >
                    Success Stories
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`${typography.h2} text-gray-900 mb-4`}
                  >
                    Join Our Growing{' '}
                    <span className="relative">
                      <span className="relative z-10 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                        Community
                      </span>
                      <motion.svg
                        width="100%"
                        height="8"
                        viewBox="0 0 100 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -bottom-2 left-0 w-full"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 99 7.5 99 5.5"
                          stroke="rgb(109, 81, 251)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        />
                      </motion.svg>
                    </span>
                  </motion.h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {[
                    {
                      quote: "Through Mira, I found my passion for environmental conservation. The platform made it easy to connect with local nonprofits.",
                      author: "Sarah Chen",
                      role: "High School Student",
                      impact: "200+ Hours"
                    },
                    {
                      quote: "As a nonprofit, we've connected with dedicated student volunteers who bring fresh perspectives to our cause.",
                      author: "Michael Torres",
                      role: "Nonprofit Director",
                      impact: "50+ Students Placed"
                    },
                    {
                      quote: "The hour tracking and verification features have streamlined our volunteer management process significantly.",
                      author: "Lisa Park",
                      role: "Volunteer Coordinator",
                      impact: "1000+ Hours Tracked"
                    }
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                      <div className="relative p-6 text-center">
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-primary-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="font-poppins text-gray-600 mb-6">{testimonial.quote}</p>
                        <div className="space-y-1">
                          <h4 className="font-poppins font-semibold text-gray-900">{testimonial.author}</h4>
                          <p className="font-poppins text-sm text-gray-500">{testimonial.role}</p>
                          <p className="font-poppins text-sm font-medium text-primary-500">{testimonial.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-6 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={signIn}
                    className="group relative px-8 py-4 bg-primary-500 text-white rounded-xl text-lg font-medium overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Journey
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "mailto:contact@mira.com"}
                    className="group relative px-8 py-4 bg-white text-primary-500 border-2 border-primary-500 rounded-xl text-lg font-medium overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-100),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Us
                      <FiMail className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-primary-100/20 bg-gradient-to-b from-white to-primary-50/10 py-20">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary-50),0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Mira Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-center gap-6">
              {[
                { icon: FiGlobe, href: "#", label: "Website" },
                { icon: FiMail, href: "mailto:contact@mira.com", label: "Email" },
                { icon: FiMessageCircle, href: "#", label: "Twitter" },
                { icon: FiHeart, href: "#", label: "Instagram" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                    aria-label={item.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3">
                {[
                  { name: "Browse Positions", href: "#platform" },
                  { name: "Post a Position", href: "#platform" },
                  { name: "How it Works", href: "#about" },
                  { name: "Impact", href: "#about" }
                ].map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      href={item.href}
                      className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.name}
                      <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                {[
                  { name: "For Students", href: "#platform" },
                  { name: "For Nonprofits", href: "#platform" },
                  { name: "Help Center", href: "#contact" },
                  { name: "Guidelines", href: "#about" }
                ].map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      href={item.href}
                      className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.name}
                      <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "#about" },
                  { name: "Partners", href: "#about" },
                  { name: "Success Stories", href: "#about" },
                  { name: "Contact", href: "#contact" }
                ].map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      href={item.href}
                      className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.name}
                      <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookies" },
                  { name: "Accessibility", href: "/accessibility" }
                ].map((item) => (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Link
                      href={item.href}
                      className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item.name}
                      <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl bg-primary-50/50 p-8 mb-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-100),0.3),transparent_70%)]" />
            <div className="relative">
              <h4 className="font-poppins text-lg font-semibold text-gray-900 mb-2">Stay Updated</h4>
              <p className="font-poppins text-sm text-gray-600 mb-4">Get the latest volunteer opportunities and nonprofit news.</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white border border-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none font-poppins text-sm"
                />
                <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-poppins text-sm font-medium hover:bg-primary-600 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-primary-100/20">
            <p className="font-poppins text-sm text-gray-600 order-2 md:order-1">
              © 2025 Mira. All rights reserved.
            </p>
            <div className="flex items-center gap-6 order-1 md:order-2">
              <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
                Terms
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
                Privacy
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;