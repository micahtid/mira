import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { FiGlobe, FiMail, FiMessageCircle, FiHeart, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative border-t border-primary-100/20 bg-gradient-to-b from-white to-primary-50/10 py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: FiGlobe, href: "#", label: "Website" },
              { icon: FiMail, href: "mailto:contact@mira.com", label: "Email" },
              { icon: FiMessageCircle, href: "#", label: "Twitter" },
              { icon: FiHeart, href: "#", label: "Instagram" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                  aria-label={item.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: "Browse Positions", href: "#platform" },
                { name: "Post a Position", href: "#platform" },
                { name: "How it Works", href: "#about" },
                { name: "Impact", href: "#about" }
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={item.href}
                    className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: "For Students", href: "#platform" },
                { name: "For Nonprofits", href: "#platform" },
                { name: "Help Center", href: "#contact" },
                { name: "Guidelines", href: "#about" }
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={item.href}
                    className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#about" },
                { name: "Partners", href: "#about" },
                { name: "Success Stories", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={item.href}
                    className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-poppins text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Accessibility", href: "/accessibility" }
              ].map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={item.href}
                    className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-primary-50/50 p-8 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-100),0.3),transparent_70%)]" />
          <div className="relative">
            <h4 className="font-poppins text-lg font-semibold text-gray-900 mb-2">Stay Updated</h4>
            <p className="font-poppins text-sm text-gray-600 mb-4">Get the latest volunteer opportunities and nonprofit news.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white border border-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none font-poppins text-sm"
              />
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-poppins text-sm font-medium hover:bg-primary-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-primary-100/20">
          <p className="font-poppins text-sm text-gray-600 order-2 md:order-1">
            2025 All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Terms
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Privacy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="#" className="font-poppins text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 