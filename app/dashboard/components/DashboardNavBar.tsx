"use client";

import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  link: string;
}

interface DashboardNavBarProps {
  items: NavItem[];
}

const DashboardNavBar = ({ items }: DashboardNavBarProps) => {
  const router = useRouter();

  const handleNavClick = (link: string) => {
    router.push(`/dashboard?page=${link}`);
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-100 rounded-lg">
      {items.map((item) => (
        <button
          key={item.link}
          onClick={() => handleNavClick(item.link)}
          className="px-4 py-2 rounded-md"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DashboardNavBar;