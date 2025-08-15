import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PhotoIcon } from '@heroicons/react/24/outline';

const productTypes = [
  'Pots & Ceramics',
  'Textiles & Fabrics',
  'Jewelry',
  'Wooden Crafts',
  'Metal Work',
  'Paintings',
  'Home Decor',
  'Clothing',
  'Accessories',
  'Other'
];

const SignUpForm = ({ userType, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleProductSelect = (product) => {
    setSelectedProducts(prev => 
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Append the selected products
      formData.append('productTypes', JSON.stringify(selectedProducts));
      
      // Append the profile photo if exists
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }
      
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6" encType="multipart/form-data">
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
        <>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              {...register('contactNumber', { 
                required: 'Contact number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="9876543210"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              id="address"
              {...register('address', { required: 'Address is required' })}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your complete address with pincode"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                {profilePhoto ? (
                  <img
                    src={URL.createObjectURL(profilePhoto)}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PhotoIcon className="h-full w-full text-gray-300" />
                )}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Change
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Types (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {productTypes.map((product) => (
                <div key={product} className="flex items-center">
                  <input
                    id={`product-${product}`}
                    type="checkbox"
                    checked={selectedProducts.includes(product)}
                    onChange={() => handleProductSelect(product)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`product-${product}`} className="ml-2 block text-sm text-gray-700">
                    {product}
                  </label>
                </div>
              ))}
            </div>
            {selectedProducts.length === 0 && (
              <p className="mt-1 text-sm text-red-500">Please select at least one product type</p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
            
            <div className="mb-4">
              <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolderName"
                {...register('accountHolderName', { required: 'Account holder name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.accountHolderName && <p className="text-red-500 text-sm">{errors.accountHolderName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  {...register('accountNumber', { 
                    required: 'Account number is required',
                    pattern: {
                      value: /^[0-9]{9,18}$/,
                      message: 'Please enter a valid account number'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>}
              </div>

              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  {...register('ifscCode', { 
                    required: 'IFSC code is required',
                    pattern: {
                      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                      message: 'Please enter a valid IFSC code (e.g., HDFC0001234)'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm uppercase"
                  placeholder="HDFC0001234"
                />
                {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>}
              </div>
            </div>
          </div>
        </>
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
