"use client";

import { useAccount } from "@/providers/AccountProvider";
import { useHelpModal } from "@/hooks/useHelpModal";
import { HelpCircle, Crown, ArrowUpCircle } from "lucide-react";
import { getPortalUrl } from "@/utils/stripeFunctions";
import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Reusable Header Button Component with Tooltip
interface HeaderButtonProps {
  icon: ReactNode;
  tooltip: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  padding?: string;
}

const HeaderButton = ({ icon, tooltip, onClick, href, disabled = false, padding = "p-2" }: HeaderButtonProps) => {
  const buttonContent = (
    <>
      {icon}
    </>
  );

  return (
    <div className="group relative">
      {href ? (
        <Link 
          href={href}
          className={`${padding} rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center`}
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${padding} rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {buttonContent}
        </button>
      )}
      
      <div className="absolute top-full mt-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-gray-800 rounded-md py-1.5 px-2.5 shadow-lg">
          <span className="default-label text-xs text-white whitespace-nowrap leading-none">{tooltip}</span>
        </div>
        <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
};

const Header = () => {
  const { accountData, isPremium } = useAccount();
  const { onOpen } = useHelpModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const portalUrl = await getPortalUrl();
      router.push(portalUrl);
    } catch (error) {
      console.error("Error accessing subscription portal:", error);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full flex justify-center items-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 overflow-hidden md:pl-[80px]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

      <div className="default-container py-16 px-6 md:px-12 w-full flex items-center justify-between
                      max-md:py-12 max-md:flex-col max-md:items-start max-md:gap-y-6 relative z-10">

        <div>
          <h3 className="default-heading text-white font-sora tracking-tight">
            Welcome Back, {accountData?.organizationName}
          </h3>
          <p className="default-text text-white/80 mt-2">
            Manage your positions and connect with talent
          </p>
        </div>

        <div className="flex items-center gap-2 max-md:self-end">
          {/* Subscription Button with Tooltip */}
          <HeaderButton
            icon={isPremium ?
              <Crown size={22} className="text-yellow-300" /> :
              <ArrowUpCircle size={24} className="text-white" />
            }
            tooltip={isPremium ? "Manage Subscription" : "Upgrade to Pro"}
            onClick={isPremium ? handleManageSubscription : undefined}
            href={!isPremium ? "/organization-dashboard/upgrade" : undefined}
            disabled={isPremium && isLoading}
            padding={isPremium ? "p-[9px]" : "p-2"}
          />

          {/* Help Button with Tooltip */}
          <HeaderButton
            icon={<HelpCircle size={24} className="text-white" />}
            tooltip="Help Guide"
            onClick={onOpen}
          />
        </div>

      </div>
    </section>
  );
}

export default Header