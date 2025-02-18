'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/utils/firebaseFunctions';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

interface NavItem {
  label: string;
  link: string;
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

  const handleNavigation = (link: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', link);
    router.replace(`${pathname}?${params.toString()}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative bg-white border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 p-4">
        <h1 className="text-base font-semibold text-gray-900">
          Dashboard
        </h1>
        <div className="h-5 w-px bg-gray-200" />
        <div className="flex items-center gap-2 flex-1">
          {items.map((item) => (
            <button
              key={item.link}
              onClick={() => handleNavigation(item.link)}
              className={twMerge(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                currentPage === item.link
                  ? 'text-primary-600 bg-primary-50/80'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {item.label}
              {currentPage === item.link && (
                <span className="block h-0.5 w-8 bg-primary-600 mx-auto mt-1 rounded-full" />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={signOut}
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-lg
            text-sm font-medium
            text-gray-600 hover:text-gray-900
            hover:bg-gray-50
            transition-all duration-200
          "
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-base font-semibold text-gray-900">
            Dashboard
          </h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              p-2 rounded-lg
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
          <div className="
            border-t border-gray-100
            py-2 px-2 space-y-1
            bg-white
          ">
            {items.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavigation(item.link)}
                className={twMerge(
                  'w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200',
                  currentPage === item.link
                    ? 'text-primary-600 bg-primary-50/80'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                signOut();
              }}
              className="
                w-full px-4 py-2.5
                rounded-lg
                text-sm font-medium
                text-left
                text-gray-600 hover:text-gray-900
                hover:bg-gray-50
                transition-all duration-200
                inline-flex items-center gap-2
              "
            >
              <FiLogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavBar;