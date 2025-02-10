"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { signOut } from "@/utils/firebaseFunctions";

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
    <nav className="flex items-center gap-3 p-2 bg-primary-50/80 backdrop-blur-sm rounded-xl border border-primary-100 shadow-sm">
      <h1 className="text-xl font-semibold font-poppins text-primary-900 px-5 py-2.5">
        Dashboard
      </h1>
      <div className="h-7 w-px bg-primary-100" />
      <div className="flex gap-1.5 flex-1">
        {items.map((item) => (
          <button
            key={item.link}
            onClick={() => handleNavigation(item.link)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === item.link
                ? "bg-white text-primary-600"
                : "text-primary-700 hover:bg-white/60 hover:text-primary-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        onClick={signOut}
        className="px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 text-primary-700 hover:bg-white/60 hover:text-primary-800"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default DashboardNavBar;