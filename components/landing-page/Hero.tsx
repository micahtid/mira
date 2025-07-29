"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const sharedClasses = {
  buttonBase: "group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300",
};

const Hero = () => {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] w-full overflow-hidden z-10 bg-gradient-to-b from-white via-primary-50/30 to-white py-16 md:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Content - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 px-2">
          {/* Main Heading */}
          <div className="space-y-4 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900"
            >
              Find The Perfect
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
                className="relative block mt-2"
              >
                <span className="relative z-10 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 bg-clip-text text-transparent bg-[size:200%_100%] animate-gradient">
                  Volunteer Position
                </span>
                <div className="absolute inset-0 bg-primary-100/20 blur-3xl rounded-full transform scale-150 opacity-50 pointer-events-none" />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-poppins text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2"
            >
              The platform that connects students with meaningful youth-led volunteer opportunities.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mt-6 md:mt-8"
          >
            <button 
              onClick={signIn}
              className={`${sharedClasses.buttonBase} bg-primary-500 text-white hover:bg-primary-600`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Browse Positions
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button 
              onClick={signIn}
              className={`${sharedClasses.buttonBase} bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-100`}
            >
              <span className="relative z-10">Post a Position</span>
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10
            max-md:flex-col"
          >
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-primary-50 shadow-sm relative overflow-hidden"
                >
                  <img
                    src={`/profile-dummy-${i+1}.jpg`}
                    alt={`Profile ${i+1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
                </div>
              ))}
            </div>
            <p className="font-poppins text-gray-600 font-medium">
              <span className="font-semibold text-gray-900">10+</span> nonprofits &
              <span className="font-semibold text-gray-900"> 50+</span> students
            </p>
          </motion.div>
        </div>
        
        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto px-2 sm:px-4"
        >
          <div className="w-full flex justify-center">
            <img
              src="/hero_display.jpg"
              alt="Hero Display"
              className="rounded-2xl shadow-xl w-full h-auto object-contain"
              style={{ aspectRatio: 'auto' }}
            />
          </div>
          {/* Decorative blurred background elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary-100/50 blur-xl" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-200/30 blur-xl" />
          <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-primary-300/40" />
          <div className="absolute bottom-1/3 -left-4 w-6 h-6 rounded-full bg-primary-400/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;