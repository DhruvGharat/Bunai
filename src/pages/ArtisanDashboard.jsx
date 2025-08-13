import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, ShoppingBagIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts'
import products from '../data/products.json'
import orders from '../data/orders.json'
import analytics from '../data/analytics.json'

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProductForm, setShowProductForm] = useState(false)

  const sidebarItems = [
    { icon: HomeIcon, text: 'Dashboard', path: '/artisan' },
    { icon: ShoppingBagIcon, text: 'My Products', path: '/artisan/products' },
    { icon: ChartBarIcon, text: 'Orders', path: '/artisan/orders' },
    { icon: UserIcon, text: 'Earnings', path: '/artisan/earnings' },
    { icon: UserIcon, text: 'Profile', path: '/artisan/profile' }
  ]

  const handleProductSubmit = (product) => {
    // Mock product creation
    setShowProductForm(false)
    // In a real app, this would make an API call to create the product
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'products':
        return <ProductsContent />
      case 'orders':
        return <OrdersContent />
      case 'earnings':
        return <EarningsContent />
      case 'profile':
        return <ProfileContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-maroon mb-8">Artisan</h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium
                    rounded-md
                    ${
                      activeTab === item.path.replace('/artisan/', '')
                        ? 'bg-maroon text-white'
                        : 'text-neutral-dark hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setActiveTab(item.path.replace('/artisan/', ''))}
                >
                  <item.icon
                    className={`
                      mr-3 h-6 w-6
                      ${
                        activeTab === item.path.replace('/artisan/', '')
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

const DashboardContent = () => {
  const earningsData = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
    { name: 'Jul', uv: 3490 },
    { name: 'Aug', uv: 4000 },
    { name: 'Sep', uv: 3000 },
    { name: 'Oct', uv: 2000 },
    { name: 'Nov', uv: 2780 },
    { name: 'Dec', uv: 1890 }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-neutral-dark mb-4">Total Earnings</h3>
        <p className="text-3xl font-bold text-maroon">₹1,25,000</p>
        <p className="text-sm text-neutral-dark/70">This month</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-neutral-dark mb-4">Active Products</h3>
        <p className="text-3xl font-bold text-maroon">15</p>
        <p className="text-sm text-neutral-dark/70">On sale</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-neutral-dark mb-4">Pending Orders</h3>
        <p className="text-3xl font-bold text-maroon">3</p>
        <p className="text-sm text-neutral-dark/70">To be shipped</p>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg col-span-2">
        <h3 className="text-xl font-bold text-neutral-dark mb-4">Monthly Earnings</h3>
        <LineChart width={600} height={300} data={earningsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#800000"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-lg col-span-2">
        <h3 className="text-xl font-bold text-neutral-dark mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {orders.orders
            .filter(order => order.items.some(item => item.artist.id === 3))
            .map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-neutral-dark">Order #{order.id}</p>
                  <p className="text-sm text-neutral-dark/70">
                    {order.buyer.name} • {order.createdAt}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-neutral-dark">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                  <button className="text-maroon hover:text-maroon/80">
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const ProductsContent = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-dark">My Products</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90"
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          {/* Product Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select category</option>
                <option value="textiles">Textiles</option>
                <option value="jewelry">Jewelry</option>
                <option value="art">Art</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="text-maroon hover:text-maroon/80"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                  ₹{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">Active</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-maroon hover:text-maroon/80">Edit</button>
                  <button className="ml-4 text-red-600 hover:text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const OrdersContent = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Buyer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{order.buyer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                  {order.items.map((item) => item.name).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-maroon hover:text-maroon/80">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const EarningsContent = () => {
  const earningsData = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 },
    { name: 'Jul', uv: 3490, pv: 4300 },
    { name: 'Aug', uv: 4000, pv: 3800 },
    { name: 'Sep', uv: 3000, pv: 3800 },
    { name: 'Oct', uv: 2000, pv: 3800 },
    { name: 'Nov', uv: 2780, pv: 3800 },
    { name: 'Dec', uv: 1890, pv: 3800 }
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Earnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div>
          <h3 className="text-xl font-bold text-neutral-dark mb-4">Monthly Earnings</h3>
          <BarChart width={600} height={300} data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pv" fill="#800000" />
            <Bar dataKey="uv" fill="#FFB400" />
          </BarChart>
        </div>

        {/* Earnings Breakdown */}
        <div>
          <h3 className="text-xl font-bold text-neutral-dark mb-4">Earnings Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-neutral-dark">Total Earnings</h4>
                <p className="text-2xl font-bold text-maroon">₹1,25,000</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-dark">Platform Fee</h4>
                <p className="text-2xl font-bold text-maroon">₹18,750</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm text-neutral-dark">Net Earnings</h4>
                <p className="text-2xl font-bold text-maroon">₹1,06,250</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-dark">Withdrawn</h4>
                <p className="text-2xl font-bold text-maroon">₹75,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileContent = () => {
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
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Artisan Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Specialty
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                About Your Craft
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              ></textarea>
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

export default ArtisanDashboard
