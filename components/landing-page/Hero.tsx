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
    <section 
    id="home"
    className="relative min-h-[80vh] md:min-h-[90vh] w-full overflow-hidden flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-100),0.3),transparent_70%)] pointer-events-none z-0" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Left Group */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[15%] left-[10%] w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl z-10 md:opacity-100 opacity-[0.35]"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.2 }
          }}
          className="absolute top-[25%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/20 to-blue-50/10 backdrop-blur-sm border border-blue-200/20 shadow-lg z-9 max-lg:hidden"
          style={{ transformOrigin: "center center" }}
        />

        {/* Top Right Group */}
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.4 }
          }}
          className="absolute top-[20%] right-[15%] w-40 h-40 rounded-2xl bg-gradient-to-br from-purple-200/20 to-purple-50/10 backdrop-blur-sm border border-purple-200/20 shadow-lg z-9 md:opacity-100 opacity-[0.35]"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.6 }
          }}
          className="absolute top-[35%] right-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-lg z-8 max-xl:hidden"
          style={{ transformOrigin: "center center" }}
        />

        {/* Bottom Right Group */}
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.3 }
          }}
          className="absolute bottom-[20%] right-[5%] w-60 h-60 rounded-2xl bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl z-10 md:opacity-100 opacity-[0.35]"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }}
          className="absolute bottom-[30%] right-[15%] w-36 h-36 rounded-full bg-gradient-to-br from-pink-200/20 to-pink-50/10 backdrop-blur-sm border border-pink-200/20 shadow-lg z-9 max-lg:hidden"
          style={{ transformOrigin: "center center" }}
        />

        {/* Bottom Left Group */}
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.7 }
          }}
          className="absolute bottom-[25%] left-[15%] w-44 h-44 rounded-2xl bg-gradient-to-br from-indigo-200/20 to-indigo-50/10 backdrop-blur-sm border border-indigo-200/20 shadow-lg z-9 md:opacity-100 opacity-[0.35]"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.9 }
          }}
          className="absolute bottom-[15%] left-[25%] w-28 h-28 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-lg z-8 max-xl:hidden"
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
            <span className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-primary-100/80 backdrop-blur-sm text-primary-600 text-xs md:text-sm font-medium border border-primary-200/50 mb-12">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Apply & Post Positions
            </span>
          </div>

          {/* Main Heading */}
          <div 
            className="space-y-4 md:space-y-6 z-20"
          >
            <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 flex flex-col items-center justify-center space-y-2 md:space-y-2">
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
              The platform that connects students with meaningful youth-led volunteer opportunities.
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
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center hover:bg-primary-600 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300"
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
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-primary-500 border-2 border-primary-500 rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center hover:bg-primary-100 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300"
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
                  <div 
                    key={i}
                    className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-primary-50 shadow-lg cursor-pointer relative overflow-hidden hover:scale-110 hover:z-10 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]" />
                  </div>
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