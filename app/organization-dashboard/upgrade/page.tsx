"use client";

import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft, FiAward, FiGlobe, FiStar, FiZap, FiTrendingUp, FiUsers } from "react-icons/fi";
import { getCheckoutUrl } from '@/utils/stripeFunctions';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/AccountProvider';

const Upgrade = () => {
  const router = useRouter();
  const { isPremium } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  // Handle Back Button Click
  const handleBack = () => {
    router.back();
  };

  const upgradeToPremium = async () => {
    try {
      setIsLoading(true);
      const productId = "price_1R40FPFwEZHzHvCUVeb7cTWR"; // Use Your Own Product ID
      const checkoutUrl = await getCheckoutUrl(productId);
      router.push(checkoutUrl);
    } catch (error) {
      console.error("Error upgrading to premium:", error);
      setIsLoading(false);
    }
  };

  // Premium Features With Detailed Descriptions
  const premiumFeatures = [
    {
      title: "Multiple Active Positions",
      basic: "1 active position",
      pro: "3 active positions",
      description: "Post multiple positions simultaneously to attract diverse talent.",
      icon: <FiUsers className="w-5 h-5 text-primary-500" />
    },
    {
      title: "Slots Per Position",
      basic: "1 slot per position",
      pro: "1-10 slots per position",
      description: "Hire multiple candidates for the same position to build stronger teams.",
      icon: <FiZap className="w-5 h-5 text-primary-500" />
    },
    {
      title: "Listing Visibility",
      basic: "Standard listing",
      pro: "Boosted listings",
      description: "Get higher visibility in search results and featured placement.",
      icon: <FiTrendingUp className="w-5 h-5 text-primary-500" />
    },
    {
      title: "Support Level",
      basic: "Standard support",
      pro: "Priority support",
      description: "Get faster responses and dedicated assistance for your questions.",
      icon: <FiStar className="w-5 h-5 text-primary-500" />
    },
    {
      title: "Analytics",
      basic: "Basic stats",
      pro: "Advanced analytics",
      description: "Gain deeper insights into applicant engagement and position performance.",
      icon: <FiTrendingUp className="w-5 h-5 text-primary-500" />
    }
  ];
  
  // Plan Summary For Header Section
  const plans = [
    {
      title: "Basic",
      price: "Free",
      icon: <FiGlobe className="w-5 h-5 text-primary-500" />
    },
    {
      title: "Pro",
      price: "$29.99/year",
      icon: <FiAward className="w-5 h-5 text-primary-500" />
    }
  ];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-standard p-standard flex items-center justify-center min-h-[100vh]">
        <div className="text-center">
          <div className="animate-pulse text-primary-600 text-xl mb-2">Loading...</div>
          <p className="default-label text-gray-500">Processing your request</p>
        </div>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="mx-auto max-w-standard p-standard py-8">
        <button onClick={handleBack} className="back-button mb-6">
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="default-subheading text-gray-800 mb-4">Subscription Status</h1>
          
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
            <span className="default-label text-gray-700">Premium Plan Active</span>
          </div>
          
          <div className="default-text text-gray-600 mb-6">
            You are already enjoying all the benefits of Organization Pro. Thank you for your support!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-standard p-standard py-8">
      <button onClick={handleBack} className="back-button mb-6">
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h2 className="default-subheading text-gray-900">Upgrade Your Organization</h2>
          <p className="default-label text-gray-500 mt-2">Take your organization to the next level with premium features!</p>
        </div>

        {/* Plans Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
              {plans.map((plan, index) => (
                <div key={index} className="flex items-center gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-xl ${index === 1 ? 'bg-primary-100' : 'bg-gray-100'} flex items-center justify-center`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="default-label font-semibold text-gray-900">{plan.title}</h3>
                    <p className="default-label text-gray-700">{plan.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div>
          <h3 className="default-label font-semibold text-gray-900 mb-4">Compare Features</h3>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200">
              <div className="col-span-4 p-4 border-r border-gray-200">
                <p className="default-label font-semibold text-gray-700">Feature</p>
              </div>
              <div className="col-span-4 p-4 border-r border-gray-200">
                <p className="default-label font-semibold text-gray-700">Basic</p>
              </div>
              <div className="col-span-4 p-4">
                <p className="default-label font-semibold text-primary-600">Pro</p>
              </div>
            </div>
            
            {/* Table Rows */}
            {premiumFeatures.map((feature, index) => (
              <div key={index} className={`grid grid-cols-12 ${index !== premiumFeatures.length - 1 ? 'border-b border-gray-200' : ''}`}>
                {/* Feature Name */}
                <div className="col-span-4 p-4 border-r border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="default-label font-medium text-gray-900">{feature.title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Basic Plan */}
                <div className="col-span-4 p-4 border-r border-gray-200 flex items-center">
                  <p className="default-label text-gray-700">{feature.basic}</p>
                </div>
                
                {/* Pro Plan */}
                <div className="col-span-4 p-4 flex items-center">
                  <p className="default-label text-gray-900 font-medium">{feature.pro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="default-label font-semibold text-white text-lg">Ready to upgrade?</h3>
              <p className="default-label text-white/80">Get access to all premium features today.</p>
            </div>
            <button
              onClick={upgradeToPremium}
              disabled={isLoading}
              className="bg-white text-primary-600 hover:bg-white/90 py-2 px-6 rounded-lg font-medium transition-colors"
            >
              <span className="flex items-center justify-center gap-2 default-label">
                Proceed to Checkout
                <FiArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;