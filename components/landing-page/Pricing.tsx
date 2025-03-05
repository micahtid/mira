import { FiArrowRight, FiUsers, FiAward, FiGlobe, FiCheck, FiMail } from "react-icons/fi";
import { signIn } from "@/utils/firebaseFunctions";

const Pricing = () => {
  const plans = [
    {
      title: "Student",
      description: "Perfect for high school volunteers",
      price: "Free",
      duration: "forever",
      features: ["Browse all positions", "Track volunteer hours"],
      icon: <FiUsers className="w-5 h-5 text-primary-500" />, 
      buttonText: "Get Started",
      buttonAction: signIn,
      buttonStyle: "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    },
    {
      title: "Nonprofit Pro",
      description: "For growing organizations",
      price: "$29",
      duration: "/month",
      features: ["Unlimited positions", "Advanced analytics", "Email notifications", "Priority support"],
      icon: <FiAward className="w-5 h-5 text-primary-500" />, 
      buttonText: "Start Free Trial",
      buttonAction: signIn,
      buttonStyle: "bg-primary-500 text-white hover:bg-primary-600",
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      duration: "pricing",
      features: ["Everything in Pro", "Custom integration", "Dedicated support", "SLA agreement"],
      icon: <FiGlobe className="w-5 h-5 text-primary-500" />, 
      buttonText: "Contact Sales",
      buttonAction: () => window.location.href = "mailto:contact@mira.com",
      buttonStyle: "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-50),0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(var(--primary-50),0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary-100/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
        />
        <div
          className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/20 to-primary-50/10 backdrop-blur-sm border border-primary-200/20"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-500 text-sm font-medium mb-4"
          >
            Simple Pricing
          </span>
          <h2 
            className="font-poppins text-4xl lg:text-5xl font-semibold leading-tight mb-4 text-black"
          >
            <span className="relative inline-block">
              Choose the Right Plan
              <svg
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 99 7.5 99 5.5"
                  stroke="rgb(109, 81, 251)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p 
            className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Flexible plans for nonprofits of all sizes. Students can browse and apply for free.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl bg-white border p-8 shadow-md hover:-translate-y-[10px] hover:shadow-xl transition-all duration-300 flex flex-col h-full ${plan.title === "Nonprofit Pro" ? "lg:border-2 lg:border-primary-500 lg:scale-105 z-10" : "border-primary-100/20"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/20 to-white rounded-2xl ${plan.title === "Nonprofit Pro" ? "z-10" : ""}`} />
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-50),0.3),transparent_70%)] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${plan.title === "Nonprofit Pro" ? "z-10" : ""}`} />
              <div className="relative z-10 flex flex-col flex-grow">
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
                  {plan.title === "Nonprofit Pro" && <p className="text-sm text-primary-500 mt-1">Save 20% with annual billing</p>}
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
                      {plan.title === "Enterprise" ? <FiMail className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /> : <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;