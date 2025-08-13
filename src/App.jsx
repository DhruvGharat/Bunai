import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import WelcomePage from './pages/WelcomePage';
import LoginRole from './pages/LoginRole';
import AdminDashboard from './pages/AdminDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import BuyerSignUp from './pages/BuyerSignUp';
import ArtisanSignUp from './pages/ArtisanSignUp';
import VolunteerSignUp from './pages/VolunteerSignUp';

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: true, // Set to true for development
    role: 'artisan' // Set to 'artisan' for dashboard access
  });

  const PrivateRoute = ({ children, allowedRoles }) => {
    const content = authState.isAuthenticated && allowedRoles.includes(authState.role) ? children : <Navigate to="/" replace />;
    return <>{content}</>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login/:role" element={<LoginRole />} />
        <Route path="/signup/buyer" element={
          <PrivateRoute allowedRoles={['admin', 'buyer', 'artisan', 'volunteer']}>
            <BuyerSignUp />
          </PrivateRoute>
        } />
        <Route path="/signup/artisan" element={
          <PrivateRoute allowedRoles={['admin', 'buyer', 'artisan', 'volunteer']}>
            <ArtisanSignUp />
          </PrivateRoute>
        } />
        <Route path="/signup/volunteer" element={
          <PrivateRoute allowedRoles={['admin', 'buyer', 'artisan', 'volunteer']}>
            <VolunteerSignUp />
          </PrivateRoute>
        } />
        
        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer/*"
          element={
            <PrivateRoute allowedRoles={['buyer']}>
              <BuyerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/artisan/*"
          element={
            <PrivateRoute allowedRoles={['artisan']}>
              <ArtisanDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/volunteer/*"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <VolunteerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
