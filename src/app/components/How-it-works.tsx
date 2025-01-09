export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Choose Your Plan',
      description:
        'Select the subscription plan that suits your schedule and budget.',
      icon: '🗓️', // Replace with an actual icon/image
    },
    {
      step: '2',
      title: 'Book a Workspace',
      description:
        'Reserve your preferred coworking space easily through our platform.',
      icon: '📅',
    },
    {
      step: '3',
      title: 'Focus on Your Work',
      description:
        'Enjoy a comfortable, well-equipped workspace with high-speed internet.',
      icon: '💻',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Get started in just three simple steps.
        </p>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full text-2xl font-bold">
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
