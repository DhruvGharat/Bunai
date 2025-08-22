import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import WelcomePage from './pages/WelcomePage';
import LoginRole from './pages/LoginRole';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import BuyerLayout from './components/BuyerLayout';
import ArtisanDashboard from './pages/ArtisanDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import BuyerSignUp from './pages/BuyerSignUp';
import ArtisanSignUp from './pages/ArtisanSignUp';
import VolunteerSignUp from './pages/VolunteerSignUp';

// Buyer Pages
import Cart from './pages/buyer/Cart';
import Orders from './pages/buyer/Orders';
import Wishlist from './pages/buyer/Wishlist';
import Settings from './pages/buyer/Settings';

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { authState } = useAuth();
  console.log('Auth State:', authState); // Debug log
  console.log('Allowed Roles:', allowedRoles); // Debug log
  const content = authState.isAuthenticated && allowedRoles.includes(authState.user?.role) 
    ? children 
    : <Navigate to="/" replace />;
  return <>{content}</>;
};

// Main App Component
function AppContent() {
  const { authState, setAuthState } = useAuth();
  
  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, role: null, user: null });
    // You might want to add a redirect to home or login page here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={authState.isAuthenticated} 
        userRole={authState.role}
        onLogout={handleLogout} 
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login/:role" element={<LoginRole />} />
          <Route path="/signup/buyer" element={<BuyerSignUp />} />
          <Route path="/signup/artisan" element={<ArtisanSignUp />} />
          <Route path="/signup/volunteer" element={<VolunteerSignUp />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin/*" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Buyer Layout */}
          <Route 
            path="/buyer" 
            element={
              <PrivateRoute allowedRoles={['buyer']}>
                <BuyerLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Artisan Routes */}
          <Route 
            path="/artisan/*" 
            element={
              <PrivateRoute allowedRoles={['artisan']}>
                <ArtisanDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Redirect any unmatched routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
          {/* Volunteer Routes */}
          <Route 
            path="/volunteer/*" 
            element={
              <PrivateRoute allowedRoles={['volunteer']}>
                <VolunteerDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Main App Wrapper
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
