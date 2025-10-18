import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiGlobe, FiMail, FiPhone, FiHeart, FiArrowRight } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const Footer = () => {
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+62 812 3576 6940')
      .then(() => {
        alert('Phone number copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <footer
    id="contact"
    className="relative border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(109,81,251,0.02),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(109,81,251,0.01)_1px,transparent_1px),linear-gradient(-45deg,rgba(109,81,251,0.01)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-8 sm:px-10 md:px-12 lg:px-16">
        {/* Logo and Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 md:mb-12 gap-6 sm:gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-xl sm:w-[60px] sm:h-[60px]"
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: FiGlobe, label: "Website" },
              { icon: FiMail, href: "mailto:contact@mira.com", label: "Email" },
              { icon: FiPhone, onClick: copyPhoneNumber, label: "Phone" },
              { icon: FiHeart, href: "https://www.instagram.com/mira.app.official/", label: "Instagram" }
            ].map((item, i) => {
              const Icon = item.icon;
              const hasAction = item.href || item.onClick;

              return (
                <a
                  key={i}
                  href={item.href || undefined}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    } else if (!item.href) {
                      e.preventDefault();
                    }
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center ${hasAction ? 'hover:bg-primary-100 hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-default'} transition-all duration-200`}
                  aria-label={item.label}
                >
                  <Icon size={18} className="sm:text-[20px]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Platform</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Browse Positions", href: "#home", onClick: signIn },
                { name: "Post a Position", href: "#home", onClick: signIn },
                { name: "How it Works", href: "#how-it-works" },
              ].map((item) => (
                <li
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="text-sm sm:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 sm:gap-2 group"
                  >
                    <span className="truncate">{item.name}</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "For Students", href: "#platform" },
                { name: "For Nonprofits", href: "#platform" }
              ].map((item) => (
                <li
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 sm:gap-2 group"
                  >
                    <span className="truncate">{item.name}</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "About Us", href: "#about" }
              ].map((item) => (
                <li
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 sm:gap-2 group"
                  >
                    <span className="truncate">{item.name}</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Privacy Policy", href: "/terms-and-policy#privacy-policy" },
                { name: "Terms of Service", href: "/terms-and-policy#terms-of-service" }
              ].map((item) => (
                <li
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 sm:gap-2 group"
                  >
                    <span className="truncate">{item.name}</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary-50/50 to-accent-50/30 p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 md:mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(81,138,251,0.08),transparent_70%)]" />
          <div className="relative">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Stay Updated</h4>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Get the latest volunteer opportunities and nonprofit news.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-white border border-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm sm:text-base"
              />
              <button className="px-4 sm:px-6 py-2 bg-primary-500 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-primary-600 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-gray-200 pb-20 sm:pb-6">
          <p className="text-sm sm:text-base text-gray-600 text-center sm:text-left order-2 sm:order-1">
            2025 All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 justify-center sm:justify-end order-1 sm:order-2">
            <Link href="tel:+62812357661234" className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Support: +62 812 3576 1234
            </Link>
            <span className="hidden sm:inline text-gray-300">•</span>
            <Link href="/terms-and-policy" className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Terms
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms-and-policy" className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;