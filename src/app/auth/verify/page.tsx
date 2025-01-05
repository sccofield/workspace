'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';

export default function Verify() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setMessage('Email is required for verification.');
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email: email!, // Non-null assertion
      token: code,
      type: 'signup',
    });

    if (error) {
      setMessage('Invalid or expired verification code. Please try again.');
    } else {
      setMessage('Verification successful! Redirecting...');
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  const resendCode = async () => {
    if (!email) {
      setMessage('Email is required for verification.');
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage('Error resending code: ' + error.message);
    } else {
      setMessage('Verification code resent! Check your email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto w-20"
          />
          <h1 className="text-2xl font-bold mt-2 text-gray-900">
            Verify your account
          </h1>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <p className="text-gray-600 text-center mb-4">
          Enter the verification code sent to <strong>{email}</strong>.
        </p>

        <form onSubmit={handleVerification} className="space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 "
          >
            Verify
          </button>
          <button
            type="button"
            onClick={resendCode}
            className="text-orange-500 hover:underline text-sm mt-2"
          >
            Resend Verification Code
          </button>
        </form>
      </div>
    </div>
  );
}
