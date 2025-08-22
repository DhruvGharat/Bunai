import { Link, useLocation } from 'react-router-dom';
import { 
  UserIcon, 
  ShoppingCartIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const BuyerSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/buyer', icon: UserIcon },
    { name: 'My Cart', path: '/buyer/cart', icon: ShoppingCartIcon },
    { name: 'My Orders', path: '/buyer/orders', icon: ShoppingBagIcon },
    { name: 'Wishlist', path: '/buyer/wishlist', icon: HeartIcon },
    { name: 'Settings', path: '/buyer/settings', icon: Cog6ToothIcon },
  ];

  // Check if the current route matches the nav item path
  const isActive = (path) => {
    // Handle dashboard route specifically
    if (path === '/buyer') {
      return location.pathname === '/buyer' || location.pathname === '/buyer/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4 h-full">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Buyer Dashboard</h2>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-mustard/10 text-mustard font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 bg-mustard rounded-full"></span>
              )}
            </Link>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Need help?</p>
            <p className="font-medium">Contact Support</p>
          </div>
          <div className="p-2 bg-mustard/10 rounded-lg">
            <svg className="h-5 w-5 text-mustard" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerSidebar;
