export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-100 to-white py-16 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Text Content */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Work Smarter, Not Harder
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Discover flexible coworking spaces tailored to your needs. Manage
            subscriptions, book spaces, and focus on what truly matters.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="/auth/register"
              className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="text-orange-500 px-6 py-3 rounded-md text-lg font-semibold border border-orange-500 hover:bg-orange-100"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
