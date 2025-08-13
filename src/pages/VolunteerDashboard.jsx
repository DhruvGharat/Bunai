import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon, ClockIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import deliveries from "../data/deliveries.json"

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('available')

  const sidebarItems = [
    { icon: ShoppingCartIcon, text: 'Available Orders', path: '/volunteer/orders' },
    { icon: ClockIcon, text: 'My Deliveries', path: '/volunteer/deliveries' },
    { icon: ChartBarIcon, text: 'Earnings', path: '/volunteer/earnings' },
    { icon: UserIcon, text: 'Profile', path: '/volunteer/profile' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'available':
        return <AvailableOrders />
      case 'deliveries':
        return <MyDeliveries />
      case 'earnings':
        return <Earnings />
      case 'profile':
        return <Profile />
      default:
        return <AvailableOrders />
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-maroon mb-8">Volunteer</h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium
                    rounded-md
                    ${
                      activeTab === item.path.replace('/volunteer/', '')
                        ? 'bg-maroon text-white'
                        : 'text-neutral-dark hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setActiveTab(item.path.replace('/volunteer/', ''))}
                >
                  <item.icon
                    className={`
                      mr-3 h-6 w-6
                      ${
                        activeTab === item.path.replace('/volunteer/', '')
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }
                    `}
                    aria-hidden="true"
                  />
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

const AvailableOrders = () => {
  const availableDeliveries = deliveries.deliveries.filter(
    delivery => delivery.status === 'pending'
  )

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Available Orders</h2>
      <div className="space-y-4">
        {availableDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-neutral-dark">Order #{delivery.orderId}</p>
              <p className="text-sm text-neutral-dark/70">
                {delivery.pickupLocation.artistName} → {delivery.dropLocation.buyerName}
              </p>
              <p className="text-sm text-neutral-dark/70">
                Distance: {delivery.distance}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-dark">
                ₹{delivery.fee.toLocaleString()}
              </span>
              <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MyDeliveries = () => {
  const myDeliveries = deliveries.deliveries.filter(
    delivery => delivery.volunteer?.id === 4
  )

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">My Deliveries</h2>
      <div className="space-y-4">
        {myDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-neutral-dark">Order #{delivery.orderId}</p>
              <p className="text-sm text-neutral-dark/70">
                {delivery.pickupLocation.artistName} → {delivery.dropLocation.buyerName}
              </p>
              <p className="text-sm text-neutral-dark/70">
                Status: {delivery.status}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {delivery.status === 'picked' && (
                <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
                  Mark Delivered
                </button>
              )}
              {delivery.status === 'pending' && (
                <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
                  Mark Picked
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Earnings = () => {
  const completedDeliveries = deliveries.deliveries.filter(
    delivery => delivery.status === 'completed' && delivery.volunteer?.id === 4
  )

  const totalEarnings = completedDeliveries.reduce((sum, delivery) => sum + delivery.fee, 0)

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Earnings</h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-neutral-dark">Total Earnings</h3>
            <p className="text-3xl font-bold text-maroon">₹{totalEarnings.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-dark">Deliveries Completed</h3>
            <p className="text-3xl font-bold text-maroon">{completedDeliveries.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Delivery ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {completedDeliveries.map((delivery) => (
                <tr key={delivery.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">#{delivery.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {delivery.pickupLocation.artistName} → {delivery.dropLocation.buyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {delivery.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    ₹{delivery.fee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {delivery.rating} stars
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
            Withdraw Earnings
          </button>
        </div>
      </div>
    </div>
  )
}

const Profile = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Profile</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                UPI ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Delivery Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-neutral-dark">Deliveries Completed</h4>
                <p className="text-2xl font-bold text-maroon">125</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-dark">Average Rating</h4>
                <p className="text-2xl font-bold text-maroon">4.8</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-neutral-dark">Total Distance</h4>
                <p className="text-2xl font-bold text-maroon">15,000km</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-dark">Earnings</h4>
                <p className="text-2xl font-bold text-maroon">₹25,000</p>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
          Update Profile
        </button>
      </div>
    </div>
  )
}

export default VolunteerDashboard
