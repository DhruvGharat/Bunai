import LoginBase from '../components/LoginBase';

const AdminLogin = () => {
  return (
    <LoginBase
      role="Admin"
      title="Admin Login"
      description="Sign in to manage the platform"
      roleIcon={<User size={24} className="text-red-600" />}
      roleColor="red-600"
    />
  );
};

export default AdminLogin;
