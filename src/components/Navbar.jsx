import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  ShoppingCartIcon,
  ChevronDownIcon,
  HomeIcon,
  InformationCircleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: true },
    { name: 'Shop', href: '/shop', icon: ShoppingBagIcon, current: false },
    { name: 'About Us', href: '/about', icon: InformationCircleIcon, current: false },
  ];

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const loginRef = useRef(null);
  const languageRef = useRef(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' }
  ];

  const authOptions = [
    { name: 'Customer Login', href: '/login/customer', description: 'Access your customer account' },
    { name: 'Artist Login', href: '/login/artisan', description: 'Access your artist dashboard' },
    { name: 'Delivery Partner Login', href: '/login/delivery', description: 'Access delivery partner dashboard' },
    { name: 'Admin Login', href: '/login/admin', description: 'Access admin panel' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold mr-2">
                B
              </div>
              <span className="text-xl font-bold text-gray-900">BUNAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:ml-10 lg:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center text-sm font-medium ${
                    item.current ? 'text-amber-600' : 'text-gray-700 hover:text-gray-800'
                  }`}
                >
                  <item.icon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
              
              {/* Login Dropdown */}
              <div className="relative" ref={loginRef}>
                <button 
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  <UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  Login
                  <ChevronDownIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                </button>
                
                {/* Dropdown Menu */}
                {isLoginOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {authOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            navigate(option.href);
                            setIsLoginOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <div className="font-medium">{option.name}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Language Selector */}
              <div className="relative ml-4" ref={languageRef}>
                <button 
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-1" />
                  {languages.find(lang => lang.code === language)?.name.slice(0, 2)}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLanguageOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            language === lang.code 
                              ? 'bg-gray-100 text-gray-900' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Cart Icon */}
              <Link to="/cart" className="ml-4 text-gray-700 hover:text-gray-800">
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Link to="/cart" className="mr-4 text-gray-700 hover:text-gray-800">
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center border-l-4 ${
                  item.current 
                    ? 'border-amber-500 bg-amber-50 text-amber-700' 
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                } py-2 pl-3 pr-4 text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-2">
              <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Login Options
              </h3>
              {authOptions.map((option) => (
                <Link
                  key={option.name}
                  to={option.href}
                  className="block border-l-4 border-transparent py-2 pl-11 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {option.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
