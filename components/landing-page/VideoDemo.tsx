import { motion } from "motion/react";
import { FiPlay, FiCheck, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { memo } from "react";

// Optimized animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } // Reduced from 0.5
  }
};

const steps = [
  {
    title: "Create Account",
    description: "Sign up in minutes with your email or Google account",
    icon: FiPlay
  },
  {
    title: "Browse Opportunities",
    description: "Find volunteer positions that match your interests",
    icon: FiCheck
  },
  {
    title: "Start Volunteering",
    description: "Apply and get matched with organizations",
    icon: FiArrowRight
  }
];

// Memoized Step component
const Step = memo(({ 
  title, 
  description, 
  icon: Icon, 
  index 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  index: number;
}) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-4"
  >
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-500" />
      </div>
    </div>
    <div>
      <h3 className="font-poppins text-lg font-semibold text-gray-900">{title}</h3>
      <p className="font-poppins text-gray-600">{description}</p>
    </div>
  </motion.div>
));

Step.displayName = "Step";

// Main VideoDemo component
const VideoDemo = () => {
  return (
    <section className="py-16 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 } // Reduced from 0.5
          }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Video Section */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.3 } // Reduced from 0.5
              }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
                poster="/video-thumbnail.jpg"
              >
                <source src="/demo.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.3 } // Reduced from 0.5
                }}
                viewport={{ once: true }}
                className="font-poppins text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
              >
                See how it works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.3, delay: 0.1 } // Reduced from 0.5
                }}
                viewport={{ once: true }}
                className="font-poppins text-lg text-gray-600"
              >
                Watch our quick demo to see how easy it is to get started
              </motion.p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <Step key={step.title} {...step} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.3, delay: 0.2 } // Reduced from 0.5
              }}
              viewport={{ once: true }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                Get Started
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(VideoDemo);