import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = ({ role, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = {
    admin: [
      { text: 'Dashboard', path: '/admin', label: 'Admin Dashboard' },
      { text: 'Users', path: '/admin/users', label: 'User Management' },
      { text: 'Products', path: '/admin/products', label: 'Product Management' },
      { text: 'Orders', path: '/admin/orders', label: 'Order Management' },
      { text: 'Deliveries', path: '/admin/deliveries', label: 'Delivery Management' },
      { text: 'Reports', path: '/admin/reports', label: 'Analytics Reports' }
    ],
    buyer: [
      { text: 'Home', path: '/buyer', label: 'Buyer Home' },
      { text: 'Categories', path: '/buyer/categories', label: 'Product Categories' },
      { text: 'Cart', path: '/buyer/cart', label: 'Shopping Cart' },
      { text: 'My Orders', path: '/buyer/orders', label: 'Order History' },
      { text: 'Profile', path: '/buyer/profile', label: 'Buyer Profile' }
    ],
    artisan: [
      { text: 'Dashboard', path: '/artisan', label: 'Artisan Dashboard' },
      { text: 'My Products', path: '/artisan/products', label: 'Manage Products' },
      { text: 'Orders', path: '/artisan/orders', label: 'Order Management' },
      { text: 'Earnings', path: '/artisan/earnings', label: 'View Earnings' },
      { text: 'Profile', path: '/artisan/profile', label: 'Artisan Profile' }
    ],
    volunteer: [
      { text: 'Available Orders', path: '/volunteer/orders', label: 'Available Delivery Orders' },
      { text: 'My Deliveries', path: '/volunteer/deliveries', label: 'Track Deliveries' },
      { text: 'Earnings', path: '/volunteer/earnings', label: 'View Earnings' },
      { text: 'Profile', path: '/volunteer/profile', label: 'Volunteer Profile' }
    ]
  }

  const languages = [
    { code: 'en', name: 'English', label: 'English Language' },
    { code: 'hi', name: 'हिंदी', label: 'Hindi Language' },
    { code: 'mr', name: 'मराठी', label: 'Marathi Language' }
  ]

  return (
    <nav className="bg-white shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-maroon" aria-label="Bunai Home">
                BUNAI
              </Link>
            </div>

            <div className="flex space-x-4">
              {navLinks[role]?.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-2 py-1 text-sm font-medium text-neutral-dark hover:text-maroon rounded-md hover:bg-gray-100"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3 relative">
              <select
                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base font-medium text-neutral-dark shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon sm:text-sm"
                aria-label="Language selection"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} aria-label={lang.label}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-3 relative">
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon hover:bg-opacity-90"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-maroon"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks[role]?.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-dark hover:text-maroon"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
