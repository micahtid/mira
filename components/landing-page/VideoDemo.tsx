import { motion } from "framer-motion";
import { FiPlay, FiCheck, FiArrowRight } from "react-icons/fi";
import { useResponsive } from "@/hooks/useResponsive";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and create your volunteer profile in just a few minutes. Add your interests, skills, and availability.",
    color: "from-blue-500/20 to-blue-100/20"
  },
  {
    number: "02",
    title: "Browse Opportunities",
    description: "Explore volunteer positions that match your interests and schedule. Filter by cause, location, and time commitment.",
    color: "from-purple-500/20 to-purple-100/20"
  },
  {
    number: "03",
    title: "Apply & Connect",
    description: "Apply to positions with one click and connect directly with nonprofit organizations.",
    color: "from-pink-500/20 to-pink-100/20"
  },
  {
    number: "04",
    title: "Track Impact",
    description: "Log your volunteer hours and see your impact grow. Get verified certificates for your service.",
    color: "from-primary-500/20 to-primary-100/20"
  }
];

const VideoDemo = () => {
  const { isMobile } = useResponsive();

  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4">
            Platform Demo
          </span>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-4">
            <span className="relative inline-block">
              See How It Works
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
          <p className="font-poppins text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Watch our quick tutorial to learn how to find and apply for volunteer positions
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-4 md:p-6 text-center">
                <div className="mb-3 md:mb-4">
                  <span className="inline-block font-poppins text-3xl md:text-4xl font-bold text-primary-500/50 group-hover:text-primary-500 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-poppins text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="font-poppins text-sm text-gray-600 line-clamp-2 md:line-clamp-none">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-900">
            {/* Video Thumbnail Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-900/40" />
            
            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center group"
            >
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FiPlay className="w-6 h-6 md:w-8 md:h-8 text-primary-500 relative z-10 translate-x-0.5" />
              </div>
            </motion.button>

            <iframe
              src="https://www.youtube.com/embed/your-video-id"
              title="Platform Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full opacity-0"
            />
          </div>

          {/* Decorative Elements - Hidden on Mobile */}
          {!isMobile && (
            <>
              <div className="absolute -left-16 -top-16 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl" />
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl" />
            </>
          )}
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 md:mt-12 flex flex-col items-center"
        >
          <p className="font-poppins text-base md:text-lg text-gray-600 mb-4">
            Want to learn more about our platform?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/documentation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors duration-200 font-medium w-full sm:w-auto"
              >
                <FiCheck className="w-5 h-5" />
                View Documentation
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/schedule-demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors duration-200 font-medium w-full sm:w-auto group"
              >
                Schedule a Demo
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo; 