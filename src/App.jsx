import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';

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
  const PrivateRoute = ({ children, allowedRoles }) => {
    const { authState } = useAuth();
    const content = authState.isAuthenticated && allowedRoles.includes(authState.role) ? children : <Navigate to="/" replace />;
    return <>{content}</>;
  };

  const AuthenticatedLayout = ({ children }) => {
    const { authState } = useAuth();
    return (
      <>
        <Navbar role={authState.role} onLogout={() => useAuth().setAuthState({ isAuthenticated: false, role: null })} />
        {children}
      </>
    );
  };

  return (
    <AuthProvider>
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
              <AuthenticatedLayout>
                <AdminDashboard />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer/*"
          element={
            <PrivateRoute allowedRoles={['buyer']}>
              <AuthenticatedLayout>
                <BuyerDashboard />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/artisan/*"
          element={
            <PrivateRoute allowedRoles={['artisan']}>
              <AuthenticatedLayout>
                <ArtisanDashboard />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/volunteer/*"
          element={
            <PrivateRoute allowedRoles={['volunteer']}>
              <AuthenticatedLayout>
                <VolunteerDashboard />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
