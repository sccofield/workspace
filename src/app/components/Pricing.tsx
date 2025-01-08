export default function Pricing() {
  return (
    <section className="bg-gray-100 py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Flexible Subscription Plans
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Choose a plan that fits your needs and start working smarter today.
        </p>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Daily Plan */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <h3 className="text-2xl font-semibold text-gray-900">Daily Plan</h3>
            <p className="mt-4 text-gray-600">₦4,000 / day</p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>Access to all coworking spaces</li>
              <li>High-speed internet</li>
              <li>Pay per day with no commitments</li>
            </ul>
            <a
              href="/auth/register"
              className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
            >
              Subscribe Now
            </a>
          </div>

          {/* Flex Weekly - Most Popular */}
          <div className="relative bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <span className="top-4 right-4 bg-orange-100 text-orange-600 px-3 py-1 text-sm rounded-full">
              Most Popular
            </span>
            <h3 className="text-2xl font-semibold text-gray-900">
              Flex Weekly
            </h3>
            <p className="mt-4 text-gray-600">₦17,500 for 5 days</p>
            <p className="text-sm text-gray-500">
              (Expires in 10 days from first use)
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>Use any 5 days within 10 days</li>
              <li>High-speed internet</li>
              <li>Access to all coworking spaces</li>
            </ul>
            <a
              href="/auth/register"
              className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
            >
              Subscribe Now
            </a>
          </div>

          {/* Flex Monthly */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <h3 className="text-2xl font-semibold text-gray-900">
              Flex Monthly
            </h3>
            <p className="mt-4 text-gray-600">₦60,000 for 20 days</p>
            <p className="text-sm text-gray-500">
              (Expires in 40 days from first use)
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>Use any 20 days within 40 days</li>
              <li>High-speed internet</li>
              <li>Priority access to spaces</li>
            </ul>
            <a
              href="/auth/register"
              className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
