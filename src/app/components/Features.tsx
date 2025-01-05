export default function Features() {
  const features = [
    {
      title: 'Flexible Plans',
      description:
        'Choose a subscription plan that works for your schedule, whether it’s daily, weekly, or monthly.',
      icon: '🗓️', // You can replace this with an actual icon/image
    },
    {
      title: 'Easy Booking',
      description:
        'Reserve your workspace in just a few clicks using our intuitive platform.',
      icon: '📅',
    },
    {
      title: 'High-Speed Internet',
      description:
        'Enjoy blazing-fast internet for uninterrupted productivity.',
      icon: '⚡',
    },
    {
      title: 'Comfortable Spaces',
      description:
        'Work in a clean, modern environment designed for your comfort and productivity.',
      icon: '🪑',
    },
    {
      title: 'Community Networking',
      description:
        'Connect with like-minded professionals in our coworking community.',
      icon: '🤝',
    },
    {
      title: 'Secure Access',
      description: 'Feel safe with our secure workspace access system.',
      icon: '🔒',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover how our coworking space app makes your work life easier and
          more productive.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
