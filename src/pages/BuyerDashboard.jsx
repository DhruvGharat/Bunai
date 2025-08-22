import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon, TagIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'
import Footer from '../components/Footer'
import products from '../data/products.json'
import orders from '../data/orders.json'

const BuyerDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [searchTerm, setSearchTerm] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Get unique categories and locations
  const categories = ['all', ...new Set(products.products.map(p => p.category))]
  const locations = ['all', ...new Set(products.products.map(p => p.artist.location))]

  const filteredProducts = products.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || product.artist.location === selectedLocation
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Discover Handcrafted Treasures</h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, artisans, or categories..."
                className="w-full px-6 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-mustard focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-mustard text-white p-2 rounded-full hover:bg-mustard-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mustard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Dropdown */}
          {isFiltersOpen && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-mustard focus:ring focus:ring-mustard focus:ring-opacity-50"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-mustard focus:ring focus:ring-mustard focus:ring-opacity-50"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range: ₹{priceRange.min} - ₹{priceRange.max}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      id="priceRange"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mustard"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Products Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
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
