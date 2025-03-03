import { motion, AnimatePresence } from "motion/react";
import { useState, memo } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

// Optimized animation variants
const itemVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.2 } // Reduced from typical 0.3
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.2 } // Reduced from typical 0.3
  }
};

// Memoized FAQ Item component
const FAQItem = memo(({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) => (
  <div className="border-b border-primary-100/20">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span className="font-poppins text-lg text-gray-900">{question}</span>
      <span className="ml-4 flex-shrink-0">
        {isOpen ? (
          <FiMinus className="w-5 h-5 text-primary-500" />
        ) : (
          <FiPlus className="w-5 h-5 text-primary-500" />
        )}
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="pb-4">
            <p className="font-poppins text-gray-600">{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

FAQItem.displayName = "FAQItem";

// Main FAQ component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  return (
    <section className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3 } // Reduced from 0.5
        }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-poppins text-lg text-gray-600">
            Everything you need to know about our volunteer platform
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(FAQ);