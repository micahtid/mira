'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, Users, Eye, PenLine, Clock, CheckSquare, Settings, Building, User } from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import { useHelpModal } from '@/hooks/useHelpModal';
import { LucideIcon } from 'lucide-react';

type CardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const HelpModal = () => {
  const { isOpen, onClose } = useHelpModal();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Card Styles
  const cardStyles = {
    container: "default-card flex flex-col items-center text-center p-4",
    icon: "text-gray-700 mb-3", // Changed from text-primary-500 to reduce purple
    title: "default-text font-semibold",
    description: "default-text text-sm text-gray-600 mt-1"
  };
  
  // Card Data (STEP 1)
  const managePositionsCards: CardItem[] = [
    {
      icon: PenLine,
      title: "Create & Edit",
      description: "Create new positions or edit existing ones with detailed descriptions"
    },
    {
      icon: Eye,
      title: "Show & Hide",
      description: "Control visibility of positions to make them public or private"
    },
    {
      icon: Clock,
      title: "Track Status",
      description: "Monitor active, hidden, and locked positions"
    }
  ];
  
  // Card Data (STEP 2)
  const viewListingsCards: CardItem[] = [
    {
      icon: Eye,
      title: "Browse Listings",
      description: "Browse all available positions posted by different organizations"
    },
    {
      icon: Users,
      title: "Preview Appearance",
      description: "See how your positions appear to potential applicants"
    },
    {
      icon: CheckSquare,
      title: "Filter Options",
      description: "Search and filter positions by keywords and position types"
    }
  ];
  
  // Card Data (STEP 3)
  const accountSettingsCards: CardItem[] = [
    {
      icon: User,
      title: "Account Info",
      description: "Manage your account details and login information"
    },
    {
      icon: Building,
      title: "Organization Profile",
      description: "Update your organization's name, description, and mission"
    },
    {
      icon: Settings,
      title: "External Links",
      description: "Add your website and social media profiles"
    }
  ];
  
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-y-6">
            <h3 className="default-subheading text-center text-gray-800 flex items-center justify-center gap-4">
              <ClipboardList size={28} className="text-gray-700" />
              Manage Positions
            </h3>
            <p className="default-text text-center">
              This section is where you create, manage, and review your available positions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {managePositionsCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={`manage-card-${index}`} className={cardStyles.container}>
                    <Icon size={40} className={cardStyles.icon} />
                    <h4 className={cardStyles.title}>{card.title}</h4>
                    <p className={cardStyles.description}>
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="flex flex-col gap-y-6">
            <h3 className="default-subheading text-center text-gray-800 flex items-center justify-center gap-4">
              <Users size={28} className="text-gray-700" />
              View Listings
            </h3>
            <p className="default-text text-center">
              Browse all available positions and see how your positions appear to potential applicants.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {viewListingsCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={`view-card-${index}`} className={cardStyles.container}>
                    <Icon size={40} className={cardStyles.icon} />
                    <h4 className={cardStyles.title}>{card.title}</h4>
                    <p className={cardStyles.description}>
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="flex flex-col gap-y-6">
            <h3 className="default-subheading text-center text-gray-800 flex items-center justify-center gap-4">
              <Settings size={28} className="text-gray-700" />
              Account Settings
            </h3>
            <p className="default-text text-center">
              Manage your organization's profile information and account details.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {accountSettingsCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={`settings-card-${index}`} className={cardStyles.container}>
                    <Icon size={40} className={cardStyles.icon} />
                    <h4 className={cardStyles.title}>{card.title}</h4>
                    <p className={cardStyles.description}>
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Modal 
      title="Dashboard Guide"
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="space-y-6">
        {/* Content */}
        <div>
          {renderStepContent()}
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="default-text text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
          <button
            onClick={nextStep}
            className="default-button py-2"
          >
            {step < totalSteps ? 'Next' : 'Got it'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal