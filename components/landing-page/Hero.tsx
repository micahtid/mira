import { motion } from "motion/react";
import { FiArrowRight, FiAward } from "react-icons/fi";
import Image from "next/image";
import { signIn } from "@/utils/firebaseFunctions";
import Link from "next/link";

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
  const handlePostPosition = async () => {
    try {
      await signIn();
      window.location.href = "/organization-dashboard/create-position";
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] w-full overflow-hidden flex items-center justify-center">
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
            transition: { ...floatingAnimation.transition, delay: 0.3 }
          }}
          className="absolute top-[60%] right-[5%] w-80 h-80 rounded-2xl bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20 shadow-xl"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.6 }
          }}
          className="absolute bottom-[20%] left-[15%] w-72 h-72 rounded-2xl bg-gradient-to-br from-primary-300/20 to-primary-100/10 backdrop-blur-sm border border-primary-200/20 shadow-xl"
          style={{ transformOrigin: "center center" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-primary-100/80 backdrop-blur-sm text-primary-600 text-xs md:text-sm font-medium shadow-lg border border-primary-200/50 mb-12">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Connecting Students with Meaningful Volunteer Opportunities
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", damping: 30, stiffness: 400 }
            }}
            className="space-y-4 md:space-y-6"
          >
            <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 flex flex-col items-center justify-center space-y-2 md:space-y-4">
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
            <p className="font-poppins text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-600">
              The platform connecting high school students with youth nonprofits for meaningful volunteer opportunities.
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", damping: 30, stiffness: 400 }
            }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 md:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/browse-positions"
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Browse Positions
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <button 
                onClick={handlePostPosition}
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-primary-500 border-2 border-primary-500 rounded-xl text-base md:text-lg font-medium overflow-hidden inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-100),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Post a Position</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Social Proof - Simplified on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", damping: 30, stiffness: 400 }
            }}
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
            <div className="hidden md:block h-12 w-px bg-primary-200/30" />
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiAward key={i} className="w-5 md:w-6 h-5 md:h-6 text-primary-400" />
                ))}
              </div>
              <p className="font-poppins text-sm md:text-lg text-gray-600 font-medium">
                Over <span className="font-bold text-gray-900">10,000+</span> volunteer hours tracked
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 