'use client';
import { useState } from 'react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Emmy',
    email: 'emmy@example.com',
    phone: '08012345678',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setMessage('');
    setIsError(false);

    try {
      // Simulated API call for profile update
      console.log('Saving profile...', formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode
    } catch {
      setMessage('Failed to update profile. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="p-4 bg-white border border-gray-300 rounded">
        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
        <p className="text-sm text-gray-600 mt-2">
          {isEditing
            ? 'Edit your phone number below.'
            : 'View your account details.'}
        </p>
      </div>

      {/* Profile Details */}
      <form className="p-4 bg-white border border-gray-300 rounded space-y-4">
        {/* Feedback Message */}
        {message && (
          <p
            className={`text-sm mt-4 text-center ${
              isError ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <p className="mt-1 text-gray-800">{formData.name}</p>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <p className="mt-1 text-gray-800">{formData.email}</p>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-800"
              placeholder="Enter your phone number"
            />
          ) : (
            <p className="mt-1 text-gray-800">{formData.phone || 'Not Set'}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
