export default function OverviewPage() {
  const subscriptions = [
    {
      plan: 'Flex Monthly',
      startDate: '1st November, 2024',
      expiryDate: '20th November, 2024',
      totalDays: 20,
      daysUsed: 15, // Example data
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="p-4 border border-gray-300 rounded bg-white">
        <h2 className="text-xl font-bold text-gray-800">Hello, Emmy</h2>
        <p className="text-sm text-gray-600">28th November, 2024</p>
        <div className="mt-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Check In
          </button>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="p-4 border border-gray-300 rounded bg-white">
        <h3 className="text-lg font-bold mb-4 text-gray-800">
          Your Active Subscriptions
        </h3>

        {subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => {
            const daysLeft = sub.totalDays - sub.daysUsed;
            const progressPercent = (sub.daysUsed / sub.totalDays) * 100;

            return (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded bg-gray-50"
              >
                <h4 className="text-md font-semibold text-gray-800">
                  {sub.plan}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Start Date:</strong> {sub.startDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Expiry Date:</strong> {sub.expiryDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Days Left:</strong> {daysLeft} days
                </p>
                {/* Progress Bar */}
                <div className="mt-2 bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-600">
            You don’t have any active subscriptions.
          </p>
        )}
      </div>

      {/* Recent Activity Table */}
      <div className="p-4 border border-gray-300 rounded bg-white">
        <h3 className="text-lg font-bold mb-4 text-gray-800">
          Recent Check-ins
        </h3>
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left text-white">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="p-2 border">28th November, 2024</td>
              <td className="p-2 border">Flex Monthly</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
