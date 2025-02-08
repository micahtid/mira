"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  const currentPage = searchParams.get("page");

  const handleNavigation = (link: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", link);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="flex gap-4 bg-gray-100 rounded-lg">
      {items.map((item) => (
        <button
          key={item.link}
          onClick={() => handleNavigation(item.link)}
          className={`px-4 py-2 rounded-md ${currentPage === item.link ? "bg-blue-600" : ""}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DashboardNavBar;