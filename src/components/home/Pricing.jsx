import { useState } from "react";

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: "$0", annual: "$0" },
      features: [
        "Access to basic search",
        "Limited track previews",
        "Ad supported",
        "Mobile access",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: { monthly: "$9.99", annual: "$7.99" },
      features: [
        "Unlimited searches",
        "Full track previews",
        "Ad-free experience",
        "Offline listening",
        "HD audio quality",
      ],
      buttonText: "Get Premium",
      popular: true,
    },
    {
      name: "Family",
      price: { monthly: "$14.99", annual: "$12.99" },
      features: [
        "Up to 6 accounts",
        "All Premium features",
        "Parental controls",
        "Family mix playlist",
        "Priority support",
      ],
      buttonText: "Choose Family",
      popular: false,
    },
  ];

  return (
    <div id="pricing" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs
          </p>

          <div className="inline-flex items-center bg-neutral-800 p-1 rounded-full">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm ${
                !annual ? "bg-amber-800 text-white shadow-lg" : "text-gray-400"
              } transition-colors duration-200`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm ${
                annual ? "bg-amber-800 text-white shadow-lg" : "text-gray-400"
              } transition-colors duration-200 ml-1`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] ${
                plan.popular ? "border-2 border-amber-800 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-amber-800 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg
                        className="h-5 w-5 text-amber-800 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-amber-900 to-amber-700 text-white shadow-[0_0_10px_rgba(146,64,14,0.5)]"
                      : "bg-neutral-800 text-white hover:bg-neutral-700"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;