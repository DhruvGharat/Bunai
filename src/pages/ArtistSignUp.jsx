import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, MapPin, Mail, CreditCard, Banknotes, Building2 } from 'lucide-react';

const ArtistSignUp = () => {
  const [activeStep, setActiveStep] = useState(1); // 1 for personal, 2 for bank details
  const [formData, setFormData] = useState({
    personal: {
      name: '',
      contactNumber: '',
      address: '',
      email: '',
      photo: null
    },
    bank: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountHolderName: ''
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Profile photo must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setFormData(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          photo: file
        }
      }));
    }
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate personal details
      const personalErrors = [];
      if (!formData.personal.name.trim()) personalErrors.push('Name is required');
      if (!formData.personal.email.trim()) personalErrors.push('Email is required');
      if (!formData.personal.contactNumber.trim()) personalErrors.push('Phone number is required');
      if (!formData.personal.address.trim()) personalErrors.push('Address is required');
      if (!formData.personal.photo) personalErrors.push('Profile photo is required');

      if (personalErrors.length > 0) {
        alert(personalErrors.join('\n'));
        return;
      }
      setActiveStep(2);
    } else {
      // Validate bank details
      const bankErrors = [];
      if (!formData.bank.accountNumber.trim()) bankErrors.push('Account number is required');
      if (!formData.bank.ifscCode.trim()) bankErrors.push('IFSC code is required');
      if (!formData.bank.bankName.trim()) bankErrors.push('Bank name is required');
      if (!formData.bank.branchName.trim()) bankErrors.push('Branch name is required');
      if (!formData.bank.accountHolderName.trim()) bankErrors.push('Account holder name is required');

      if (bankErrors.length > 0) {
        alert(bankErrors.join('\n'));
        return;
      }

      // Submit form
      console.log('Form submitted:', formData);
      // In a real app, you would send this data to your backend
    }
  };

  const handleBack = () => {
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-900 mb-2">Sign Up as Artist</h1>
          <p className="text-stone-600">Create your artisan profile to showcase your craft</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className={`flex items-center ${activeStep >= 1 ? 'text-red-900' : 'text-stone-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 border-red-900 flex items-center justify-center mr-2">
                <span className="text-sm">1</span>
              </div>
              <span>Personal Details</span>
            </div>
            <div className={`flex items-center ${activeStep >= 2 ? 'text-red-900' : 'text-stone-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 border-red-900 flex items-center justify-center mr-2">
                <span className="text-sm">2</span>
              </div>
              <span>Bank Details</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        {activeStep === 1 && (
          <div>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personal.name}
                  onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Phone className="inline-block w-4 h-4 mr-2" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.personal.contactNumber}
                  onChange={(e) => handleInputChange('personal', 'contactNumber', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Address
                </label>
                <textarea
                  value={formData.personal.address}
                  onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Mail className="inline-block w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center">
                    {formData.personal.photo ? (
                      <img
                        src={URL.createObjectURL(formData.personal.photo)}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-stone-400" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="px-6 py-2 bg-red-900 text-white rounded-lg cursor-pointer hover:bg-red-800 transition-colors"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div className="space-y-6">
              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Banknotes className="inline-block w-4 h-4 mr-2" />
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.bank.accountNumber}
                  onChange={(e) => handleInputChange('bank', 'accountNumber', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your bank account number"
                />
              </div>

              {/* IFSC Code */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Building2 className="inline-block w-4 h-4 mr-2" />
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.bank.ifscCode}
                  onChange={(e) => handleInputChange('bank', 'ifscCode', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your IFSC code"
                />
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Building2 className="inline-block w-4 h-4 mr-2" />
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bank.bankName}
                  onChange={(e) => handleInputChange('bank', 'bankName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your bank name"
                />
              </div>

              {/* Branch Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <Building2 className="inline-block w-4 h-4 mr-2" />
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.bank.branchName}
                  onChange={(e) => handleInputChange('bank', 'branchName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter your branch name"
                />
              </div>

              {/* Account Holder Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={formData.bank.accountHolderName}
                  onChange={(e) => handleInputChange('bank', 'accountHolderName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-900/50"
                  placeholder="Enter account holder name"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {activeStep === 2 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
          >
            {activeStep === 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistSignUp;
