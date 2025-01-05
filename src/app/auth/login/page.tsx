'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { supabase } from '@/utils/supabase';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Login failed: ' + error.message);
    } else {
      router.push('/dashboard'); // Redirect to dashboard
    }

    setLoading(false);
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
          <h1 className="text-2xl font-bold mt-2 text-gray-900">Login</h1>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          {/* Submit Button */}
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
                <span>Logging in...</span>
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Do not have an account?{' '}
          <a
            href="/auth/register"
            className="font-bold text-orange-500 hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
