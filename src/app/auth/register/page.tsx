'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { supabase } from '@/utils/supabase';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return false;
    }

    setMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const { email, password, name } = formData;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name, // Add the name to user_metadata
            role: 'user', // Default to "user"
          },
        },
      });
      if (error) {
        setMessage(error.message);
      } else {
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      }
    } catch {
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto w-20"
          />
          <h1 className="text-2xl font-bold mt-2 text-gray-900">
            Create an Account
          </h1>
        </div>

        {/* Error Message */}
        {message && (
          <div className="mb-4 text-center text-red-500 font-medium">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
            />
          </div>

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
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
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
                <span>Processing...</span>
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="font-bold text-orange-500 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
