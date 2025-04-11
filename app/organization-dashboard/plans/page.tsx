"use client";

import { getCheckoutUrl, getPortalUrl } from "@/utils/stripeFunctions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "@/providers/AccountProvider";

const Plans = () => {
    const router = useRouter();
    const { isPremium } = useAccount();
    const [isLoading, setIsLoading] = useState(false);

    const upgradeToPremium = async () => {
        try {
            setIsLoading(true);
            const productId = "price_1R40FPFwEZHzHvCUVeb7cTWR";
            const checkoutUrl = await getCheckoutUrl(productId);
            router.push(checkoutUrl);
        } catch (error) {
            console.error("Error upgrading to premium:", error);
            setIsLoading(false);
        }
    };

    const manageSubscription = async () => {
        try {
            setIsLoading(true);
            const portalUrl = await getPortalUrl();
            router.push(portalUrl);
        } catch (error) {
            console.error("Error managing subscription:", error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto max-w-standard p-standard flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-pulse text-primary-600 text-xl mb-2">Loading...</div>
                    <p className="text-gray-500">Processing your request</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-standard p-standard py-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-xl font-medium text-gray-800 mb-4">Subscription Status</h1>
                
                <div className="flex items-center mb-6">
                    <div className={`w-3 h-3 rounded-full mr-2 ${isPremium ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-700">
                        {isPremium ? "Premium Plan" : "Free Plan"}
                    </span>
                </div>

                <div className="space-y-3">
                    {!isPremium && (
                        <button
                            onClick={upgradeToPremium}
                            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
                        >
                            Upgrade to Premium
                        </button>
                    )}

                    {isPremium && (
                        <button
                            onClick={manageSubscription}
                            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
                        >
                            Manage Subscription
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Plans;