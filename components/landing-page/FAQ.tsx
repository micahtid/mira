import { motion, AnimatePresence } from "motion/react";
import { useState, memo } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

// Optimized animation variants
const itemVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.3 } // Adjusted for smoother animation
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.3 } // Adjusted for smoother animation
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
      answer:
        "Mira is a platform that connects youth-led organizations with high school students, making it easier to find and manage volunteers. We streamline the volunteer process, helping organizations grow while providing students with meaningful opportunities to make an impact.",
    },
    {
      question: "[For Students] How does the application process work?",
      answer:
      "After finding a position, simply answer the organization's application questions and submit your application. You will receive an email within a few days regarding your application status. If accepted, you can choose to accept or decline the offer.",
    },
    {
      question: "[For Organizations] Is there a verification process for organizations?",
      answer:
        "Currently, there is no verification required to create an organization profile. However, if you notice an entity impersonating your organization, please contact us immediately, and our team will take swift action to resolve the issue.",
    },
    {
      question: "[For Organizations] Does Mira partner with nonprofits?",
      answer:
        "Yes! While we don’t actively seek partnerships as frequently, Mira collaborates with select organizations by offering lifetime Pro memberships in exchange for backlinks and promotional reposts.",
    },
    {
      question: "[For Organizations] How can I cancel my subscription?",
      answer:
        "To cancel your Mira Pro subscription, please contact our support team. If you have a valid reason for cancellation, we will review your request and process a full refund if eligible.",
    },
  ];
  

  return (
    <section id="faq" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4 } // Adjusted for smoother animation
        }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6"
      >
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-poppins text-base sm:text-lg text-gray-600">
            Everything you need to know about Mira!
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
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