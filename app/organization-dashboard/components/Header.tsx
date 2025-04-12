"use client";

import { useAccount } from "@/providers/AccountProvider";
import { useHelpModal } from "@/hooks/useHelpModal";
import { HelpCircle, Crown, ArrowUpCircle } from "lucide-react";
import { getPortalUrl } from "@/utils/stripeFunctions";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <section className="w-full flex justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600">
      <div className="default-container py-12 w-full flex items-center justify-between
                      max-md:py-10 max-md:flex-col max-md:items-start max-md:gap-y-4">

        <h3 className="default-heading text-white">
          Welcome Back, {accountData?.organizationName}
        </h3>
        
        <div className="flex items-center gap-2">
          {isPremium ? (
            <button
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Manage subscription"
            >
              <Crown size={24} className="text-yellow-300" />
            </button>
          ) : (
            <a href="/organization-dashboard/upgrade" 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Upgrade to premium"
            >
              <ArrowUpCircle size={24} className="text-white" />
            </a>
          )}
          
          <button 
            onClick={onOpen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Open help guide"
          >
            <HelpCircle size={24} className="text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Header