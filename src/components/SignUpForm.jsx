import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUpForm = ({ userType, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (data) => {
    setLoading(true);
    setError('');
    try {
      await onSubmit(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {userType === 'artisan' && (
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
            Portfolio URL
          </label>
          <input
            type="url"
            id="portfolio"
            {...register('portfolio', { required: 'Portfolio URL is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio.message}</p>}
        </div>
      )}

      {userType === 'buyer' && (
        <div>
          <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <textarea
            id="shippingAddress"
            {...register('shippingAddress', { required: 'Shipping address is required' })}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.shippingAddress && <p className="text-red-500 text-sm">{errors.shippingAddress.message}</p>}
        </div>
      )}

      {userType === 'volunteer' && (
        <div>
          <label htmlFor="vehicleDetails" className="block text-sm font-medium text-gray-700">
            Vehicle Details
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="vehicleType"
              {...register('vehicleType', { required: 'Vehicle type is required' })}
              placeholder="Vehicle type (e.g., Bike, Car)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              id="licenseNumber"
              {...register('licenseNumber', { required: 'License number is required' })}
              placeholder="License plate number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType.message}</p>}
          {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
        </div>
      )}

      {userType === 'admin' && (
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            {...register('employeeId', { required: 'Employee ID is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}

          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mt-4">
            Department
          </label>
          <select
            id="department"
            {...register('department', { required: 'Department is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select department</option>
            <option value="operations">Operations</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="it">IT</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};

export default SignUpForm;
