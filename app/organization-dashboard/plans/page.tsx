"use client";

import { getCheckoutUrl, getPremiumStatus, getPortalUrl } from "@/utils/stripeFunctions";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

const Plans = () => {
    const router = useRouter();
    const [isPremium, setIsPremium] = useState(false);
    
    useEffect(() => {
        const checkPremium = async () => {
            const newPremiumStatus = await getPremiumStatus();
            setIsPremium(newPremiumStatus)
        }
        checkPremium();
    }, [])

    const upgradeToPremium = async () => {
        const productId = "price_1R40FPFwEZHzHvCUVeb7cTWR";
        const checkoutUrl = await getCheckoutUrl(productId);
        router.push(checkoutUrl);
    }

    const manageSubscription = async () => {
        const portalUrl = await getPortalUrl();
        router.push(portalUrl);
    }

  return (
    <div className='mx-auto max-w-standard p-standard
    flex flex-col gap-y-4'>
        <h3 className="default-subheading">Hello</h3>
        <p className="default-text">{isPremium ? "You are premium" : "You are not premium"}</p>
        <button
        disabled={isPremium}
        className={`p-2 bg-primary-50 default-text w-min text-nowrap rounded-md ${isPremium && "opacity-50"}`}
        onClick={upgradeToPremium}>Upgrade to Premium</button>
        <button
        disabled={!isPremium}
        className={`p-2 bg-primary-50 default-text w-min text-nowrap rounded-md ${!isPremium && "opacity-50"}`}
        onClick={manageSubscription}>Manage Subscription</button>
    </div>
  )
}

export default Plans