import { motion } from "motion/react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const floatingAnimation = {
  y: [0, -10, 0],
  rotate: [-1, 1, -1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                  transition={{ duration: 0.5 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
                >
                  Success Stories
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-poppins text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-4"
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
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
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
  );
};

export default CTA;