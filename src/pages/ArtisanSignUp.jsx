import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const ArtisanSignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    // TODO: Implement actual signup logic
    console.log('Artisan signup data:', data);
    // For now, just navigate to artisan dashboard
    navigate('/artisan/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your Artisan account
          </h2>
        </div>
        <SignUpForm userType="artisan" onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default ArtisanSignUp;
