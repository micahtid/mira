'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/utils/firebaseFunctions';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiBriefcase, FiFileText, FiSettings, FiList } from 'react-icons/fi';

interface NavItem {
  label: string;
  link: string;
  icon?: React.ReactNode;
}

interface DashboardNavBarProps {
  items: NavItem[];
}

const DashboardNavBar = ({ items }: DashboardNavBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = searchParams.get('page');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavigation = (link: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', link);
    router.replace(`${pathname}?${params.toString()}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <motion.nav
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        animate={{ width: isExpanded ? '240px' : '80px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-sm border-r border-gray-200/60 z-40"
      >
        <div className="flex flex-col h-full py-6">
          {/* Navigation Items */}
          <div className="flex flex-col gap-2 flex-1 px-3 pt-2">
            {items.map((item) => {
              const isActive = currentPage === item.link;
              return (
                <button
                  key={item.link}
                  onClick={() => handleNavigation(item.link)}
                  className={twMerge(
                    'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'text-primary-600 bg-primary-50/80'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <span className="text-xl flex-shrink-0">
                    {item.icon}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      width: isExpanded ? 'auto' : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-semibold text-sm whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarTab"
                      className="absolute left-0 inset-y-2 w-1 bg-primary-600 rounded-r-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sign Out Button */}
          <div className="px-3 mt-auto">
            <button
              onClick={signOut}
              className="
                w-full flex items-center gap-3
                px-4 py-3 rounded-xl
                text-gray-600 hover:text-gray-900
                hover:bg-gray-50
                transition-all duration-200
              "
            >
              <FiLogOut className="text-xl flex-shrink-0" />
              <motion.span
                initial={false}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-sm whitespace-nowrap overflow-hidden"
              >
                Sign Out
              </motion.span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between py-5">
          <h1 className="default-text font-semibold text-gray-900 font-sora">
            Dashboard
          </h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              p-2 rounded-xl
              text-gray-600 hover:text-gray-900
              hover:bg-gray-50
              transition-all duration-200
            "
          >
            {isMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              border-t border-gray-100
              py-3 px-2 space-y-2
              bg-white/80 backdrop-blur-sm
              rounded-b-xl
            "
          >
            {items.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavigation(item.link)}
                className={twMerge(
                  'w-full px-4 py-3 rounded-xl default-label font-semibold text-left transition-all duration-200 flex items-center gap-3',
                  currentPage === item.link
                    ? 'text-primary-600 bg-primary-50/80'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                signOut();
              }}
              className="
                w-full px-4 py-3
                rounded-xl
                default-label font-semibold
                text-left
                text-gray-600 hover:text-gray-900
                hover:bg-gray-50
                transition-all duration-200
                inline-flex items-center gap-3
              "
            >
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default DashboardNavBar;