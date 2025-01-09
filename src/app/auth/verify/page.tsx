'use client';

import { Suspense, useState } from 'react';
import { verifyAction } from './actions';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Component to handle the verification form
function VerifyComponent() {
  const router = useRouter();
  const { setUser } = useUser();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false); // Spinner state
  const [error, setError] = useState('');
  const searchParams = useSearchParams(); // Use inside a Suspense boundary
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required for verification.');
      return;
    }

    setLoading(true); // Start spinner
    setError('');

    try {
      const user = await verifyAction(email, code);
      setUser(user);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto w-20"
          />
          <h1 className="text-2xl font-bold mt-2 text-gray-900">
            Verify Your Account
          </h1>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Instructions */}
        <p className="text-gray-600 text-center mb-4">
          Enter the verification code sent to <strong>{email}</strong>.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Verification Code Field */}
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-700"
          />

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold ${
              loading
                ? 'bg-orange-400 text-white cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Verifying...</span>
              </span>
            ) : (
              'Verify'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyComponent />
    </Suspense>
  );
}
