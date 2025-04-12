"use client";

import { useAccount } from "@/providers/AccountProvider";
import { useHelpModal } from "@/hooks/useHelpModal";
import { HelpCircle } from "lucide-react";

const Header = () => {
  const { accountData } = useAccount();
  const { onOpen } = useHelpModal();

  return (
    <section className="w-full flex justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600">
      <div className="default-container py-12 w-full flex items-center justify-between
                      max-md:py-10 max-md:flex-col max-md:items-start max-md:gap-y-4">

        <h3 className="default-heading text-white">
          Welcome Back, {accountData?.organizationName}
        </h3>
        
        <button 
          onClick={onOpen}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Open help guide"
        >
          <HelpCircle size={24} className="text-white" />
        </button>

      </div>
    </section>
  );
}

export default Header