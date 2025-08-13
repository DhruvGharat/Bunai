import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  TruckIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { PieChart, LineChart } from 'recharts'
import users from '../data/users.json'
import orders from '../data/orders.json'
import analytics from '../data/analytics.json'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { icon: HomeIcon, text: 'Dashboard', path: '/admin' },
    { icon: UsersIcon, text: 'Users', path: '/admin/users' },
    { icon: ShoppingBagIcon, text: 'Products', path: '/admin/products' },
    { icon: TruckIcon, text: 'Orders', path: '/admin/orders' },
    { icon: ChartBarIcon, text: 'Analytics', path: '/admin/analytics' },
    { icon: CogIcon, text: 'Settings', path: '/admin/settings' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'users':
        return <UsersContent />
      case 'products':
        return <ProductsContent />
      case 'orders':
        return <OrdersContent />
      case 'analytics':
        return <AnalyticsContent />
      case 'settings':
        return <SettingsContent />
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
            <h2 className="text-xl font-bold text-maroon mb-8">Admin</h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium
                    rounded-md
                    ${
                      activeTab === item.path.replace('/admin/', '')
                        ? 'bg-maroon text-white'
                        : 'text-neutral-dark hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setActiveTab(item.path.replace('/admin/', ''))}
                >
                  <item.icon
                    className={`
                      mr-3 h-6 w-6
                      ${
                        activeTab === item.path.replace('/admin/', '')
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
  const summaryData = {
    totalUsers: users.users.length,
    totalOrders: orders.orders.length,
    totalRevenue: analytics.revenue.yearly,
    activeDeliveries: orders.orders.filter(order => order.status !== 'delivered').length
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(summaryData).map(([key, value]) => (
        <div
          key={key}
          className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-neutral-dark/70 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <p className="text-3xl font-bold text-neutral-dark">{value.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center">
            <span className="text-xl">{key[0].toUpperCase()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const UsersContent = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Role
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
            {users.users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{user.role}</td>
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

const ProductsContent = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Product Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Artist
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
            {analytics.products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{product.artist.name}</td>
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
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Order Management</h2>
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
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Amount
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                  ₹{order.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-maroon hover:text-maroon/80">View</button>
                  <button className="ml-4 text-green-600 hover:text-green-500">Assign Delivery</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AnalyticsContent = () => {
  const salesData = analytics.revenue.monthly.map((month) => ({
    name: month.month,
    amount: month.amount
  }))

  const userGrowthData = analytics.userGrowth.monthly.map((month) => ({
    name: month.month,
    newUsers: month.newUsers,
    totalUsers: month.totalUsers
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">Monthly Sales</h2>
        <LineChart width={600} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#800000"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">User Growth</h2>
        <LineChart width={600} height={300} data={userGrowthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#FFB400"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="totalUsers"
            stroke="#228B22"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* Sales by Region */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">Sales by Region</h2>
        <PieChart width={600} height={300}>
          <Pie
            data={analytics.salesByRegion}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {Object.entries(analytics.salesByRegion).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? '#800000' : index === 1 ? '#FFB400' : index === 2 ? '#228B22' : '#1a1a1a'}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}

const SettingsContent = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Platform Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-dark">Platform Fee</span>
              <span className="text-maroon">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-dark">Minimum Order Value</span>
              <span className="text-maroon">₹500</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Delivery Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-dark">Base Delivery Fee</span>
              <span className="text-maroon">₹150</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-dark">Delivery Timeframe</span>
              <span className="text-maroon">3-7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
