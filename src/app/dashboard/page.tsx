'use client';

import { useUser } from '@/context/UserContext';
import { useState, useEffect } from 'react';

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  days_allocated: number;
  days_used: number;
  start_date: string | null;
  expiry_date: string;
  created_at: string;
  amount: number;
  payment_reference: string;
  days_remaining: number;
}

interface CheckIn {
  id: string;
  user_id: string;
  subscription_id: string;
  plan_name: string;
  timestamp: string; // ISO date string
}

export default function OverviewPage() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState('');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [recentCheckins, setRecentCheckins] = useState<CheckIn[]>([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [checkinMode, setCheckinMode] = useState(false);
  const [checkinError, setCheckinError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(subscriptions);

  // Fetch subscriptions and recent check-ins
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.warn('User is not available; skipping data fetch.');
        return;
      }
      console.log(user);

      try {
        console.log('Fetching data for user:', user.uid);

        // Fetch subscriptions
        console.log('Fetching subscriptions...');
        const subResponse = await fetch(`/api/subscription/user/${user.uid}`);
        if (!subResponse.ok) {
          const subErrorData = await subResponse.json();
          console.error(
            'Error fetching subscriptions:',
            subErrorData.error || 'Unknown error'
          );
          throw new Error(
            'Failed to fetch subscriptions: ' +
              (subErrorData.error || 'Unknown error')
          );
        }
        const subData = await subResponse.json();
        console.log('Subscriptions fetched successfully:', subData);
        setSubscriptions(subData);

        // Fetch recent check-ins
        console.log('Fetching recent check-ins...');
        const checkinResponse = await fetch(`/api/checkin/user/${user.uid}`);
        if (!checkinResponse.ok) {
          const checkinErrorData = await checkinResponse.json();
          console.error(
            'Error fetching check-ins:',
            checkinErrorData.error || 'Unknown error'
          );
          throw new Error(
            'Failed to fetch recent check-ins: ' +
              (checkinErrorData.error || 'Unknown error')
          );
        }
        const checkinData = await checkinResponse.json();
        console.log('Recent check-ins fetched successfully:', checkinData);
        setRecentCheckins(checkinData);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Data fetch failed:', err.message);
          setError(err.message);
        } else {
          console.error('An unknown error occurred:', err);
          setError('An unexpected error occurred.');
        }
      } finally {
        console.log('Data fetch process completed.');
        setLoadingSubscriptions(false);
      }
    };

    fetchData();
  }, [user]);

  // Set current date
  useEffect(() => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(today);
    setCurrentDate(formattedDate);
  }, []);

  const handleCheckin = async () => {
    if (!selectedSubscription) return;
    setLoading(true);

    try {
      setCheckinError('');

      const response = await fetch('/api/checkin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.uid,
          subscription_id: selectedSubscription.id,
          plan_name: selectedSubscription.plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // const errorData = await response.json();
        throw new Error(data.error || 'Check-in failed');
      }

      // Update the days_remaining locally in the context
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.id === data.subscription_id
            ? { ...sub, days_remaining: sub.days_remaining - 1 }
            : sub
        )
      );

      setSelectedSubscription(null);
      setCheckinMode(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Data fetch failed:', err.message);
        setCheckinError(err.message);
      } else {
        console.error('An unknown error occurred:', err);
        setCheckinError('An unexpected error occured.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseCheckinModal = () => {
    setCheckinError(''); // Reset check-in error
    setCheckinMode(false); // Close the modal
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="p-4 border border-gray-300 rounded bg-white">
        <h2 className="text-xl font-bold text-gray-800">Hello, {user.name}</h2>
        <p className="text-sm text-gray-600">{currentDate}</p>
        <div className="mt-4">
          <button
            onClick={() => setCheckinMode(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Check In
          </button>
        </div>
      </div>

      {/* Check-In Modal */}
      {checkinMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Select a Subscription
            </h3>
            {checkinError && (
              <p className="text-red-500 text-center mb-4 font-medium">
                {checkinError}
              </p>
            )}
            {subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`p-4 border rounded cursor-pointer ${
                      selectedSubscription?.id === sub.id
                        ? 'border-orange-500 bg-orange-100'
                        : ''
                    }`}
                    onClick={() => setSelectedSubscription(sub)}
                  >
                    <h4 className="font-bold text-gray-800">{sub.plan}</h4>
                    <p className="text-gray-800">
                      Days Left: {sub.days_remaining}
                    </p>
                  </div>
                ))}
                <button
                  onClick={handleCheckin}
                  disabled={!selectedSubscription || loading} // Disable when loading
                  className={`mt-4 w-full py-2 rounded text-white ${
                    selectedSubscription && !loading
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Checking in...</span>
                    </span>
                  ) : (
                    'Confirm Check-In'
                  )}
                </button>
              </div>
            ) : (
              <p className="text-gray-600">
                No active subscriptions available.
              </p>
            )}
            <button
              onClick={handleCloseCheckinModal}
              className="mt-4 w-full py-2 rounded text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Active Subscriptions */}
      <div className="p-4 border border-gray-300 rounded bg-white">
        <h3 className="text-lg font-bold mb-4 text-gray-800">
          Your Active Subscriptions
        </h3>
        {loadingSubscriptions ? (
          <p className="text-gray-600">Loading subscriptions...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => {
            const daysLeft = sub.days_remaining;
            const progressPercent =
              ((sub.days_allocated - sub.days_remaining) / sub.days_allocated) *
                100 || 0;

            return (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded bg-gray-50"
              >
                <h4 className="text-md font-semibold text-gray-800">
                  {sub.plan}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Amount:</strong> ₦{sub.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Created Date:</strong>{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long', // Full weekday name (e.g., "Wednesday")
                    day: 'numeric', // Day of the month (e.g., "21")
                    month: 'long', // Full month name (e.g., "July")
                    year: 'numeric', // Full year (e.g., "2025")
                  }).format(new Date(sub.created_at))}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Expiry Date:</strong>{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long', // Full weekday name (e.g., "Wednesday")
                    day: 'numeric', // Day of the month (e.g., "21")
                    month: 'long', // Full month name (e.g., "July")
                    year: 'numeric', // Full year (e.g., "2025")
                  }).format(new Date(sub.expiry_date))}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Days Left:</strong> {daysLeft} days
                </p>
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
            {recentCheckins.length > 0 ? (
              recentCheckins.map((checkin, index) => (
                <tr key={index} className="text-gray-800">
                  <td className="p-2 border">
                    {/* {new Date(checkin.timestamp).toLocaleDateString('en-US')} */}
                    {new Intl.DateTimeFormat('en-US', {
                      weekday: 'long', // Full weekday name (e.g., "Wednesday")
                      day: 'numeric', // Day of the month (e.g., "21")
                      month: 'long', // Full month name (e.g., "July")
                      year: 'numeric', // Full year (e.g., "2025")
                    }).format(new Date(checkin.timestamp))}
                  </td>
                  <td className="p-2 border">{checkin.plan_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="p-2 border text-center text-gray-600"
                >
                  No recent check-ins.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
