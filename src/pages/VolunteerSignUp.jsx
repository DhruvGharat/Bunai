import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const VolunteerSignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    // TODO: Implement actual signup logic
    console.log('Volunteer signup data:', data);
    // For now, just navigate to volunteer dashboard
    navigate('/volunteer/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your Volunteer account
          </h2>
        </div>
        <SignUpForm userType="volunteer" onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default VolunteerSignUp;
