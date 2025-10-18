"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const sharedClasses = {
  buttonBase: "group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl default-text font-semibold overflow-hidden inline-flex items-center justify-center transition-all duration-200",
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden z-10 bg-gradient-to-b from-white via-primary-50/10 to-white pt-40 md:pt-48 pb-16 md:pb-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(109,81,251,0.06),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(109,81,251,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(109,81,251,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 relative">
        {/* Header Content - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-2">
          {/* Main Heading */}
          <div className="space-y-4 md:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
            >
              Find The Perfect
              <motion.span
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative block mt-2"
              >
                <span className="relative z-10 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent bg-[size:200%_100%] animate-gradient">
                  Volunteer Position
                </span>
                <div className="absolute inset-0 bg-primary-200/30 blur-3xl rounded-full transform scale-150 opacity-50 pointer-events-none" />
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="default-text text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed"
            >
              The platform that connects students with meaningful youth-led volunteer opportunities.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mt-6 md:mt-8"
          >
            <button
              onClick={signIn}
              className={`${sharedClasses.buttonBase} bg-primary-500 text-white hover:bg-primary-600`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Browse Positions
                <FiArrowRight className="w-5 h-5" />
              </span>
            </button>
            <button
              onClick={signIn}
              className={`${sharedClasses.buttonBase} bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50`}
            >
              <span className="relative z-10">Post a Position</span>
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10
            max-md:flex-col"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-primary-100 shadow-md relative overflow-hidden">
                <img src="/profile-dummy-1.jpg" alt="Profile 1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-secondary-200 to-secondary-100 shadow-md relative overflow-hidden">
                <img src="/profile-dummy-2.jpg" alt="Profile 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-accent-200 to-accent-100 shadow-md relative overflow-hidden">
                <img src="/profile-dummy-3.jpg" alt="Profile 3" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-secondary-300 to-secondary-200 shadow-md relative overflow-hidden">
                <img src="/profile-dummy-4.jpg" alt="Profile 4" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
              </div>
            </div>
            <p className="default-text text-gray-600">
              <span className="font-bold text-gray-900">10+</span> nonprofits &
              <span className="font-bold text-gray-900"> 50+</span> students
            </p>
          </motion.div>
        </div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto px-2 sm:px-4"
        >
          <div className="w-full flex justify-center">
            <img
              src="/hero_display.jpg"
              alt="Hero Display"
              className="rounded-2xl shadow-md w-full h-auto object-contain ring-1 ring-gray-100"
              style={{ aspectRatio: 'auto' }}
            />
          </div>
          {/* Decorative blurred background elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-secondary-200/40 blur-2xl" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent-200/30 blur-2xl" />
          <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-accent-400/40" />
          <div className="absolute bottom-1/3 -left-4 w-6 h-6 rounded-full bg-secondary-300/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;