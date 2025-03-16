import { FiArrowRight, FiUsers, FiAward, FiGlobe, FiCheck } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const Pricing = () => {
  const plans = [
    {
      title: "Organization Free",
      description: "For All Organizations",
      price: "Free",
      duration: "Lifetime",
      features: ["1 active position", "1 slot per position"],
      icon: <FiGlobe className="w-5 h-5 text-primary-500" />, 
      buttonText: "Get Started",
      buttonAction: signIn,
      buttonStyle: "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
      highlighted: false
    },
    {
      title: "Organization Pro",
      description: "For Growing Organizations",
      price: "$29.99",
      duration: "/year",
      features: ["3 active positions", "1-10 slots per position", "Boosted listings", "Priority support"],
      icon: <FiAward className="w-5 h-5 text-primary-500" />, 
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
      icon: <FiUsers className="w-5 h-5 text-primary-500" />, 
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 -right-16 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-3 sm:mb-4">
            Pricing Plans
          </span>
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="font-poppins text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your organization or join as a student for free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 ${
                plan.highlighted 
                  ? "border-primary-500 shadow-primary-100/50" 
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-poppins text-xl font-semibold text-black">{plan.title}</h3>
                  <p className="font-poppins text-sm text-black/70">{plan.description}</p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-poppins text-4xl font-bold text-black">{plan.price}</span>
                  <span className="font-poppins text-lg text-black/70">{plan.duration}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li 
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary-500" />
                    </div>
                    <span className="font-poppins text-base text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button
                  onClick={plan.buttonAction}
                  className={`group relative w-full py-3 px-6 rounded-xl ${plan.buttonStyle} font-medium transition-all duration-300 hover:-translate-y-[2px]`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {plan.buttonText}
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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