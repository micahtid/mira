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
    className="relative border-t border-primary-100/20 bg-gradient-to-b from-white to-primary-50/10 py-12 sm:py-16 md:py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 md:gap-12 lg:gap-16 px-2 sm:px-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </div>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
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
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center ${hasAction ? 'hover:bg-primary-100 hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-default'} transition-all duration-200`}
                  aria-label={item.label}
                >
                  <Icon size={18} className="sm:text-[20px]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 md:gap-14 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="default-label font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: "Browse Positions", href: "#home", onClick: signIn },
                { name: "Post a Position", href: "#home", onClick: signIn },
                { name: "How it Works", href: "#how-it-works" },
              ].map((item) => (
                <li 
                  key={item.name}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
            <h4 className="default-label font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: "For Students", href: "#platform" },
                { name: "For Nonprofits", href: "#platform" }
              ].map((item) => (
                <li 
                  key={item.name}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    href={item.href}
                    className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
            <h4 className="default-label font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#about" }
              ].map((item) => (
                <li 
                  key={item.name}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    href={item.href}
                    className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
            <h4 className="default-label font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/terms-and-policy#privacy-policy" },
                { name: "Terms of Service", href: "/terms-and-policy#terms-of-service" }
              ].map((item) => (
                <li 
                  key={item.name}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    href={item.href}
                    className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {item.name}
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
          className="relative rounded-2xl bg-primary-50/50 p-6 sm:p-8 mb-12 overflow-hidden max-lg:hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-100),0.3),transparent_70%)]" />
          <div className="relative">
            <h4 className="default-text font-semibold text-gray-900 mb-2">Stay Updated</h4>
            <p className="default-label text-gray-600 mb-4">Get the latest volunteer opportunities and nonprofit news.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white border border-primary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none default-label"
              />
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg default-label font-medium hover:bg-primary-600 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-primary-100/20 pb-24 sm:pb-10">
          <p className="default-label text-gray-600 text-center md:text-left">
            2025 All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center md:justify-end">
            <Link href="tel:+62812357661234" className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Support: +62 812 3576 1234
            </Link>
            <Link href="/terms-and-policy" className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Terms
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms-and-policy" className="default-label text-gray-600 hover:text-primary-500 transition-colors duration-200">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;