"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 2.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] w-full overflow-hidden flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-100),0.3),transparent_70%)] pointer-events-none z-0" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[15%] left-[10%] w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl z-10"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.3 }
          }}
          className="absolute top-[60%] right-[5%] w-60 h-60 rounded-2xl bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl z-10"
          style={{ transformOrigin: "center center" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 z-20 relative">
        <div 
          className="flex flex-col items-center text-center"
        >
          {/* Status Badge */}
          <div 
            className="inline-block z-10"
          >
            <span className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-primary-100/80 backdrop-blur-sm text-primary-600 text-xs md:text-sm font-medium shadow-lg border border-primary-200/50 mb-12">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Connecting Students with Meaningful Volunteer Opportunities
            </span>
          </div>

          {/* Main Heading */}
          <div 
            className="space-y-4 md:space-y-6 z-20"
          >
            <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 flex flex-col items-center justify-center space-y-2 md:space-y-4">
              <span>Find The Perfect</span>
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
                <div className="absolute inset-0 bg-primary-100/20 blur-3xl rounded-full transform scale-150 opacity-50 pointer-events-none" />
              </motion.span>
            </h1>
            <p className="font-poppins text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-600">
              The platform connecting high school students with youth nonprofits for meaningful volunteer opportunities.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 md:mt-12"
          >
            <div
              className="w-full sm:w-auto"
            >
              <button 
                onClick={signIn}
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center hover:bg-primary-600 transition duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Browse Positions
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
            <div
              className="w-full sm:w-auto"
            >
              <button 
                onClick={signIn}
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-primary-500 border-2 border-primary-500 rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center hover:bg-primary-100 transition duration-300"
              >
                <span className="relative z-10">Post a Position</span>
              </button>
            </div>
          </div>

          {/* Enhanced Social Proof - Simplified on Mobile */}
          <div 
            className="flex items-center justify-center gap-8 md:gap-12 mt-12 md:mt-16"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-primary-50 shadow-lg cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
                  </motion.div>
                ))}
              </div>
              <p className="font-poppins text-sm md:text-lg text-gray-600 font-medium">
                Trusted by <span className="font-bold text-gray-900">100+</span> nonprofits
                <br />and <span className="font-bold text-gray-900">1,000+</span> students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* White Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Hero;