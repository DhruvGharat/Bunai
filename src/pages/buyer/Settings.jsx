import { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    notifications: true,
    newsletter: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Cog6ToothIcon className="h-8 w-8 text-mustard mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mustard focus:border-mustard sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mustard focus:border-mustard sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-mustard focus:border-mustard sm:text-sm"
                />
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="focus:ring-mustard h-4 w-4 text-mustard border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">Get updates about your orders and account.</p>
                </div>
              </div>
              
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="focus:ring-mustard h-4 w-4 text-mustard border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-medium text-gray-700">
                    Newsletter
                  </label>
                  <p className="text-gray-500">Receive our weekly newsletter with featured products.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mustard hover:bg-mustard/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
