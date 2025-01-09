export default function CTA() {
  return (
    <section className="bg-orange-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-lg">
          Join our coworking community and work smarter today. Choose a plan
          that fits your schedule.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <a
            href="/auth/register"
            className="bg-white text-orange-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100"
          >
            Get Started
          </a>
          <a
            href="#pricing"
            className="bg-transparent border border-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-orange-500"
          >
            Explore Plans
          </a>
        </div>
      </div>
    </section>
  );
}
