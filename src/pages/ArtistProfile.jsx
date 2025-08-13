import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon, MapPinIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const ArtistProfile = () => {
  const [activeTab, setActiveTab] = useState('story')

  const artist = {
    name: 'Aarti Devi',
    location: 'Kutch, Gujarat',
    tribe: 'Rabari',
    rating: 4.8,
    reviews: 125,
    products: 32,
    followers: 1500,
    story: `
      Aarti Devi is a master weaver from the Rabari tribe of Kutch, Gujarat. Her family has been practicing traditional embroidery for generations, passing down the intricate patterns and techniques through oral tradition. Aarti learned the art from her grandmother and mother, and has dedicated her life to preserving and promoting Rabari embroidery.

      Her work features traditional motifs such as peacocks, elephants, and floral patterns, each with deep cultural significance. The colors she uses are sourced from natural dyes, maintaining the authenticity of the craft. Aarti is not only a skilled artisan but also a cultural ambassador, teaching young girls in her community about their heritage through embroidery.

      Through Bunai, Aarti has been able to reach a wider audience and share her art with the world. Her earnings have helped her family and community, allowing them to preserve their traditional way of life while adapting to modern challenges.
    `
  }

  const tabItems = [
    { id: 'story', title: 'Her Story' },
    { id: 'products', title: 'Products' },
    { id: 'reviews', title: 'Reviews' },
    { id: 'gallery', title: 'Gallery' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'story':
        return <StorySection artist={artist} />
      case 'products':
        return <ProductsSection />
      case 'reviews':
        return <ReviewsSection />
      case 'gallery':
        return <GallerySection />
      default:
        return <StorySection artist={artist} />
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream">
      {/* Header */}
      <div className="relative h-64 bg-maroon">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{artist.name}</h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-5 w-5" />
                <span>{artist.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-5 w-5" />
                <span>{artist.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-5 w-5" />
                <span>Member since 2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-maroon text-maroon'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  )
}

const StorySection = ({ artist }) => (
  <div className="space-y-8">
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-4">Her Story</h2>
      <div className="prose max-w-none text-neutral-dark">
        <div dangerouslySetInnerHTML={{ __html: artist.story }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-dark mb-4">Craft Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-dark">Specialization</h3>
          <p className="text-neutral-dark/80">Rabari Embroidery</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-dark">Materials</h3>
          <p className="text-neutral-dark/80">Natural Silk, Cotton, Natural Dyes</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-dark">Techniques</h3>
          <p className="text-neutral-dark/80">Chain Stitch, Buttonhole Stitch, Cross Stitch</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-dark">Motifs</h3>
          <p className="text-neutral-dark/80">Peacocks, Elephants, Floral Patterns</p>
        </div>
      </div>
    </div>
  </div>
)

const ProductsSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-neutral-dark mb-6">Featured Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={`/images/products/artisan-${i}.jpg`}
            alt={`Product ${i}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-neutral-dark mb-2">
            Traditional Rabari Shawl
          </h3>
          <p className="text-neutral-dark/80 mb-4">
            Hand-embroidered with traditional motifs
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-maroon">₹3,500</span>
            <button className="bg-maroon text-white px-4 py-2 rounded-lg hover:bg-maroon/90">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ReviewsSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-neutral-dark mb-6">Customer Reviews</h2>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 border rounded-lg flex"
        >
          <div className="flex-shrink-0">
            <img
              src={`/images/avatars/avatar-${i}.jpg`}
              alt={`Avatar ${i}`}
              className="h-12 w-12 rounded-full"
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-neutral-dark">5.0</span>
              </div>
              <span className="text-sm text-neutral-dark">2 days ago</span>
            </div>
            <p className="mt-2 text-neutral-dark">
              The craftsmanship is absolutely stunning. The colors and patterns are exactly as described in the story. This piece will be a family heirloom.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const GallerySection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-neutral-dark mb-6">Gallery</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="relative aspect-square">
          <img
            src={`/images/artwork/${i}.jpg`}
            alt={`Artwork ${i}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button className="bg-white text-maroon px-4 py-2 rounded-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default ArtistProfile
