import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "What is Mira?",
    answer: "Mira is a platform that connects nonprofits with volunteers, making it easier to manage volunteer programs and track impact. We help organizations streamline their volunteer management while providing students with meaningful opportunities to make a difference."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple! If you're a student, you can sign up for free and start browsing volunteer opportunities right away. For nonprofits, choose a plan that fits your needs and create your organization's profile to begin posting positions."
  },
  {
    question: "Is Mira free for students?",
    answer: "Yes! Mira is completely free for students. You can create an account, browse opportunities, track your volunteer hours, and build your impact portfolio without any cost."
  },
  {
    question: "What features are included in the Pro plan?",
    answer: "The Pro plan includes unlimited volunteer position postings, advanced analytics to track impact, automated email notifications, priority support, and more. It's perfect for growing nonprofits looking to scale their volunteer programs."
  },
  {
    question: "Can I switch plans later?",
    answer: "Absolutely! You can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing cycle. If you downgrade, your new rate will take effect at your next billing cycle."
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer: "Yes, we offer special discounts for registered nonprofits. Contact our sales team to learn more about our nonprofit pricing and available discounts."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-1, 1, -1],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
          style={{ transformOrigin: "center center" }}
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-1, 1, -1],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }
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
            Common Questions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-poppins text-4xl lg:text-5xl font-semibold leading-tight mb-4 text-black"
          >
            <span className="relative inline-block">
              Frequently Asked Questions
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
            Have questions? We're here to help. If you can't find what you're looking for, feel free to contact our support team.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-xl bg-white border border-primary-100/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex justify-between items-center">
                  <h3 className="font-poppins text-lg font-medium text-black">{faq.question}</h3>
                  <div className="ml-4">
                    {openIndex === index ? (
                      <FiMinus className="w-5 h-5 text-primary-500" />
                    ) : (
                      <FiPlus className="w-5 h-5 text-primary-500" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <p className="mt-4 text-gray-600 font-poppins">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-poppins text-base text-gray-600 mb-4">
            Still have questions?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "mailto:support@mira.com"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors duration-200 font-medium"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 