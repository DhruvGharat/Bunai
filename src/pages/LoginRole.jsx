import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const LoginRole = () => {
  const { role } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { setAuthState } = useAuth()

  const roleColors = {
    admin: { primary: 'maroon', secondary: 'mustard' },
    buyer: { primary: 'mustard', secondary: 'forest-green' },
    artisan: { primary: 'forest-green', secondary: 'mustard' },
    volunteer: { primary: 'neutral-dark', secondary: 'mustard' }
  }

  const roleTitles = {
    admin: 'Admin Login',
    buyer: 'Buyer Login',
    artisan: 'Artisan Login',
    volunteer: 'Volunteer Login'
  }

  const roleDescriptions = {
    admin: 'Manage the platform and support the artisan community',
    buyer: 'Access exclusive tribal crafts and support artisans',
    artisan: 'Sell your traditional crafts and reach a wider audience',
    volunteer: 'Help deliver orders and support the artisan community'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login - in a real app, this would make an API call
    if (formData.email && formData.password) {
      // Simulate successful login
      setAuthState({ isAuthenticated: true, role: role })
      navigate(`/${role}`)
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`text-center text-3xl font-bold text-${roleColors[role].primary}`}>
            {roleTitles[role]}
          </h2>
          <p className={`mt-2 text-center text-sm text-${roleColors[role].secondary}`}>
            {roleDescriptions[role]}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`
                  appearance-none rounded-none relative block w-full px-3 py-2
                  border border-gray-300 placeholder-gray-500 text-gray-900
                  rounded-t-md focus:outline-none focus:ring-${roleColors[role].primary}
                  focus:border-${roleColors[role].primary} focus:z-10 sm:text-sm
                `}
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`
                  appearance-none rounded-none relative block w-full px-3 py-2
                  border border-gray-300 placeholder-gray-500 text-gray-900
                  rounded-b-md focus:outline-none focus:ring-${roleColors[role].primary}
                  focus:border-${roleColors[role].primary} focus:z-10 sm:text-sm
                `}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 text-${roleColors[role].primary} focus:ring-${roleColors[role].primary} border-gray-300 rounded`} />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-dark">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to={`/forgot-password/${role}`} className={`font-medium text-${roleColors[role].secondary} hover:text-${roleColors[role].primary}`}>
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`
                group relative w-full flex justify-center py-2 px-4
                border border-transparent text-sm font-medium rounded-md
                text-white bg-${roleColors[role].primary}
                hover:bg-opacity-90 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-${roleColors[role].primary}
              `}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-neutral-dark">
            Don't have an account?{' '}
            <Link
              to={`/signup/${role}`}
              className={`font-medium text-${roleColors[role].secondary} hover:text-${roleColors[role].primary}`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginRole
