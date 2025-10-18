import { FiArrowRight, FiUsers, FiAward, FiGlobe, FiCheck } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const Pricing = () => {
  const plans = [
    {
      title: "Org Free",
      description: "For All Organizations",
      price: "Free",
      duration: "Lifetime",
      features: ["1 active position", "1 slot per position"],
      icon: <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />, 
      buttonText: "Get Started",
      buttonAction: signIn,
      buttonStyle: "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
      highlighted: false
    },
    {
      title: "Org Pro",
      description: "For Growing Organizations",
      price: "$29.99",
      duration: "/year",
      features: ["3 active positions", "1-10 slots per position", "Priority support"],
      icon: <FiAward className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />, 
      buttonText: "Purchase",
      buttonAction: signIn,
      buttonStyle: "bg-primary-500 text-white hover:bg-primary-600",
      highlighted: true
    },
    {
      title: "Student",
      description: "For All Students",
      price: "Free",
      duration: "Lifetime",
      features: ["Browse & filter positions", "Submit applications"],
      icon: <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />, 
      buttonText: "Get Started",
      buttonAction: signIn,
      buttonStyle: "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="relative py-12 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(109,81,251,0.04),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(109,81,251,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(109,81,251,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 -right-16 w-64 h-64 bg-accent-100/25 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-secondary-100/25 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-xl bg-primary-50 text-primary-500 default-label font-semibold mb-3 sm:mb-4">
            Pricing Plans
          </span>
          <h2 className="default-heading text-gray-900 leading-tight mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="default-text text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that works best for your organization or join as a student for free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border-2 flex flex-col ${
                plan.highlighted
                  ? "border-primary-500"
                  : "border-gray-100"
              } hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="default-subheading text-black">{plan.title}</h3>
                  <p className="default-label text-black/70">{plan.description}</p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-black">{plan.price}</span>
                  <span className="font-sora text-sm sm:text-base md:text-lg text-black/70">{plan.duration}</span>
                </div>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-500" />
                    </div>
                    <span className="default-label text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button
                  onClick={plan.buttonAction}
                  className={`group relative w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl ${plan.buttonStyle} default-text font-semibold transition-all duration-200`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    {plan.buttonText}
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;