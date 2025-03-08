// Motion imports
import { motion } from "framer-motion";
import React from 'react';

// UI Components
import { BentoGrid, BentoGridProps } from "@/components/landing-page/ui/BentoGrid";
import type { BentoCardProps } from "@/components/landing-page/ui/BentoGrid";

// Icons
import {
  FiUsers,
  FiBarChart2,
  FiShield,
  FiCheckCircle
} from "react-icons/fi";

const features: BentoCardProps[] = [
  {
    name: "For Nonprofits",
    className: "md:col-span-2",
    Icon: FiUsers,
    description: "Easily create and manage volunteer positions, track applications, and communicate with volunteers.",
    features: ["Post unlimited positions", "Track applications", "Verify volunteer hours", "Generate reports"],
    href: "/nonprofits",
    cta: "Post a Position",
    color: "bg-primary-500",
    background: "from-primary-50/20 to-primary-100/10"
  },
  {
    name: "For Students",
    className: "md:col-span-1",
    Icon: FiCheckCircle,
    description: "Browse volunteer positions that match your interests and schedule.",
    features: ["Smart matching", "Hour tracking", "Digital certificates", "Mobile app"],
    href: "/students",
    cta: "Browse Positions",
    color: "bg-primary-500",
    background: "from-primary-100/10 to-primary-50/20"
  },
  {
    name: "Safety & Verification",
    className: "md:col-span-1",
    Icon: FiShield,
    description: "Robust verification system for nonprofits and volunteer hour tracking.",
    features: ["ID verification", "Background checks", "Hour validation", "Secure data"],
    href: "/safety",
    cta: "Learn More",
    color: "bg-primary-500",
    background: "from-primary-100/15 to-primary-50/15"
  },
  {
    name: "Communication",
    className: "md:col-span-2",
    Icon: FiBarChart2,
    description: "Built-in messaging system for seamless coordination between volunteers and organizations.",
    features: ["Real-time chat", "File sharing", "Group messaging", "Mobile notifications"],
    href: "/messaging",
    cta: "Start Chatting",
    color: "bg-primary-500",
    background: "from-primary-50/15 to-primary-100/15"
  }
];

interface Props extends Omit<BentoGridProps, 'children'> {
  children?: React.ReactNode;
}

// Shared className constants
const sharedClasses = {
  sectionBase: "relative overflow-hidden z-10",
  motionText: "font-poppins text-base md:text-lg text-gray-600 mb-8 md:mb-12",
  badgeBase: "inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4",
  heading: "font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 text-black",
};

const Features = () => {
  const props: Props = {
    items: features,
    className: "max-w-6xl mx-auto gap-4 md:gap-6",
  };

  return (
    <section 
    id="platform"
    className={`${sharedClasses.sectionBase} py-12 lg:py-28`}>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-50 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.05),transparent_50%)] z-0" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem] z-0" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={sharedClasses.badgeBase}
          >
            Platform Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={sharedClasses.heading}
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
            className={sharedClasses.motionText}
          >
            Everything you need to manage volunteer positions and track impact, all in one place.
          </motion.p>
        </motion.div>

        <BentoGrid {...props} />
      </div>
    </section>
  );
};

export default Features;