'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

type Plan = {
  id: string;
  name: string;
  price: number;
  daysAllocated: number;
  validityDays: number;
};

const PLANS: Plan[] = [
  {
    id: 'daily',
    name: 'Daily Plan',
    price: 4000,
    daysAllocated: 1,
    validityDays: 1,
  },
  {
    id: 'flex-weekly',
    name: 'Flex Weekly',
    price: 17500,
    daysAllocated: 5,
    validityDays: 10,
  },
  {
    id: 'flex-monthly',
    name: 'Flex Monthly',
    price: 60000,
    daysAllocated: 20,
    validityDays: 40,
  },
];

export default function SubscriptionPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () =>
      (script.onerror = () => console.error('Failed to load Paystack script'));
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script); // Clean up script on unmount
      }
    };
  }, []);

  const handlePayment = (plan: Plan) => {
    if (!window.PaystackPop) {
      alert('Paystack is not loaded. Please try again later.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert('Paystack public key is not configured. Please contact support.');
      return;
    }

    if (!user?.email) {
      alert('User email is not available. Please log in again.');
      return;
    }

    // Initialize a new transaction
    const popup = new window.PaystackPop();
    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: plan.price * 100, // Convert to kobo
      currency: 'NGN',
      metadata: {
        plan_id: plan.id,
        plan_name: plan.name,
        daysAllocated: plan.daysAllocated,
        validityDays: plan.validityDays,
      },

      onSuccess: async (transaction) => {
        setLoading(true);
        try {
          // Save subscription details to backend
          const res = await fetch('/api/subscription/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user.uid,
              plan_id: plan.id,
              plan_name: plan.name,
              amount: plan.price,
              daysAllocated: plan.daysAllocated,
              validityDays: plan.validityDays,
              payment_reference: transaction.reference,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to save subscription.');
          }

          alert('Subscription successfully saved!');
          router.push('/dashboard');
        } catch {
          alert(
            'An error occurred while saving the subscription. Please contact support.'
          );
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        alert('Transaction canceled.');
      },
      onError: (error) => {
        alert(`Payment error: ${error.message}`);
      },
    });
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Subscription Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div key={plan.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold text-gray-800">{plan.name}</h2>
            <p className="text-gray-600">
              {plan.daysAllocated} days within {plan.validityDays} days
            </p>
            <p className="text-xl font-bold mb-4 text-gray-800">
              ₦{plan.price.toLocaleString()}
            </p>
            <button
              onClick={() => handlePayment(plan)}
              disabled={loading}
              className={`w-full py-2 rounded ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
