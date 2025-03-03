import { motion } from "framer-motion";
import { FiArrowRight, FiUsers, FiAward, FiGlobe, FiCheck, FiMail } from "react-icons/fi";
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

const Pricing = () => {
  return (
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
            className="font-poppins text-4xl lg:text-5xl font-semibold leading-tight mb-4 text-black"
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
            className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto"
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
            <FiCheck className="w-5 h-5" />
            View Full Comparison
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing; 