export default function SubscriptionPage() {
  const plans = [
    {
      name: 'Daily Plan',
      price: '₦4,000',
      features: 'Access for 1 day',
    },
    {
      name: 'Flex Weekly',
      price: '₦17,500',
      features: '5 workspace days valid for 10 days',
    },
    {
      name: 'Flex Monthly',
      price: '₦60,000',
      features: '20 workspace days valid for 40 days',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-4 bg-white border border-gray-300 rounded">
        <h2 className="text-xl font-bold text-gray-800">
          Available Subscription Plans
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Choose a plan that works best for you and start working with ease.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded bg-gray-50 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
            <p className="text-2xl font-bold text-orange-500 my-2">
              {plan.price}
            </p>
            <p className="text-sm text-gray-600">{plan.features}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
