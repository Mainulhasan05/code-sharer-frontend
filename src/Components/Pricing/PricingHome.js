import React from "react";

// Array storing package information
const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "1 User",
      "Basic Support",
      "Limited Features",
      "Save up to 50 Codes",
    ],
    bgColor: "bg-gray-300",
    textColor: "text-gray-800",
    buttonClass: "bg-gray-500 hover:bg-gray-600 text-white",
  },
  {
    name: "Standard",
    price: "$19.99",
    features: [
      "5 Users",
      "Priority Support",
      "Advanced Features",
      "Save up to 200 Codes",
    ],
    bgColor: "bg-blue-500",
    textColor: "text-white",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    name: "Premium",
    price: "$49.99",
    features: [
      "Unlimited Users",
      "24/7 Support",
      "All Features Included",
      "Save up to 1000 Codes",
    ],
    bgColor: "bg-purple-500",
    textColor: "text-white",
    buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
  },
];

const PricingHome = () => {
  return (
    <div className="py-20 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Select the perfect package for your needs. No hidden fees, just the
          features you need.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`w-full sm:w-80 lg:w-96 p-8 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 ${plan.bgColor} ${plan.textColor}`}
          >
            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-semibold mb-6">{plan.price}</p>

            <ul className="mb-6 space-y-4">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-semibold ${plan.buttonClass}`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingHome;
