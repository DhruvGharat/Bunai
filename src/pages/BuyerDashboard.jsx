import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon, TagIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'
import products from '../data/products.json'
import orders from '../data/orders.json'

const BuyerDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [...new Set(products.products.map(p => p.category))]

  const filteredProducts = products.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-soft-cream">
      {/* Navbar */}
      <Navbar role="buyer" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mustard"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all' ? 'bg-mustard text-white' : 'bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category ? 'bg-mustard text-white' : 'bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-dark">Price Range</span>
              <span className="text-sm text-neutral-dark">
                ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full mt-2"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-dark mb-2">{product.name}</h3>
        <p className="text-sm text-neutral-dark/70 mb-2">{product.artist.name}</p>
        <p className="text-lg font-bold text-maroon">₹{product.price.toLocaleString()}</p>
        <button className="mt-4 w-full px-4 py-2 bg-mustard text-white rounded-lg hover:bg-mustard/90 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default BuyerDashboard
