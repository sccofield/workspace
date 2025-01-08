'use client';

import { lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const PaystackButton = lazy(() =>
  import('react-paystack').then((mod) => ({ default: mod.PaystackButton }))
);

interface Reference {
  reference: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  daysAllocated: number;
  validityDays: number;
}

const PLANS = [
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
    price: 60000, // Naira
    daysAllocated: 20,
    validityDays: 40,
  },
];

export default function SubscriptionPage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return <p>Loading...</p>;
  }

  const handlePaymentSuccess = async (reference: Reference, plan: Plan) => {
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.uid,
          plan_id: plan.id,
          plan_name: plan.name,
          amount: plan.price,
          daysAllocated: plan.daysAllocated,
          validityDays: plan.validityDays,
          payment_reference: reference.reference,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      alert('Subscription successful!');
      router.push('/dashboard');
    } catch {
      alert('Error processing subscription. Please try again.');
    }
  };

  const getPaystackProps = (plan: Plan) => ({
    email: user.email,
    amount: plan.price * 100, // Convert to kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    metadata: {
      custom_fields: [
        {
          display_name: 'User ID',
          variable_name: 'user_id',
          value: user.uid,
        },
        {
          display_name: 'Plan Name',
          variable_name: 'plan_name',
          value: plan.name,
        },
      ],
    },
    text: 'Subscribe Now',
    onSuccess: (reference: Reference) => handlePaymentSuccess(reference, plan),
    onClose: () => alert('Payment process was canceled.'),
  });

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
            <Suspense fallback={<p>Loading Paystack Button...</p>}>
              <PaystackButton
                {...getPaystackProps(plan)}
                className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
              />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
