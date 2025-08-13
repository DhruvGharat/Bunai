import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, ShoppingBag, Palette, Truck, Globe } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import Footer from '../components/Footer';

const WelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('en');
  const [selectedRole, setSelectedRole] = useState(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0c65d2d8b12?w=1200&h=800&fit=crop&ixlib=rb-4.0.3",
      alt: "Artisan weaving traditional textiles"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&ixlib=rb-4.0.3",
      alt: "Traditional Indian jewelry"
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d28b12?w=1200&h=800&fit=crop&ixlib=rb-4.0.3",
      alt: "Handmade pottery and crafts"
    },
    {
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&h=800&fit=crop&ixlib=rb-4.0.3",
      alt: "Tribal textiles and patterns"
    }
  ];

  const text = {
    en: {
      title: "BUNAI",
      subtitle: "Weaving Together Stories and Culture",
      description: "Empowering Artisans Across India",
      continueAs: "Continue as...",
      roles: {
        admin: { name: "Admin", tagline: "Manage the platform" },
        buyer: { name: "Buyer", tagline: "Discover authentic crafts" },
        artisan: { name: "Artisan", tagline: "Share your creations" },
        volunteer: { name: "Volunteer", tagline: "Support local delivery" }
      },
      login: "Login",
      signUp: "Sign Up",
      footer: {
        about: "About",
        contact: "Contact",
        privacy: "Privacy Policy"
      }
    },
    hi: {
      title: "बुनाई",
      subtitle: "कहानियों और संस्कृति को जोड़ना",
      description: "भारत भर के कारीगरों को सशक्त बनाना",
      continueAs: "के रूप में जारी रखें...",
      roles: {
        admin: { name: "प्रबंधक", tagline: "प्लेटफॉर्म का प्रबंधन करें" },
        buyer: { name: "खरीदार", tagline: "प्रामाणिक शिल्प खोजें" },
        artisan: { name: "कारीगर", tagline: "अपनी कृतियां साझा करें" },
        volunteer: { name: "स्वयंसेवक", tagline: "स्थानीय डिलीवरी का समर्थन करें" }
      },
      login: "लॉगिन",
      signUp: "साइन अप",
      footer: {
        about: "के बारे में",
        contact: "संपर्क",
        privacy: "गोपनीयता नीति"
      }
    },
    mr: {
      title: "बुनाई",
      subtitle: "कथा आणि संस्कृती एकत्र विणत",
      description: "भारतातील कारागिरांना सक्षम करत",
      continueAs: "म्हणून सुरू ठेवा...",
      roles: {
        admin: { name: "प्रशासक", tagline: "प्लॅटफॉर्म व्यवस्थापित करा" },
        buyer: { name: "खरेदीदार", tagline: "अस्सल हस्तकला शोधा" },
        artisan: { name: "कारागीर", tagline: "आपली कृती सामायिक करा" },
        volunteer: { name: "स्वयंसेवक", tagline: "स्थानिक वितरणास समर्थन द्या" }
      },
      login: "लॉगिन",
      signUp: "साइन अप",
      footer: {
        about: "विषयी",
        contact: "संपर्क",
        privacy: "गोपनीयता धोरण"
      }
    }
  };

  const currentText = text[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const roleIcons = {
    admin: User,
    buyer: ShoppingBag,
    artisan: Palette,
    volunteer: Truck
  };

  const roleCards = [
    {
      role: 'admin',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>,
      title: 'Admin',
      description: 'Manage users, products, and orders across the platform'
    },
    {
      role: 'buyer',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>,
      title: 'Buyer',
      description: 'Discover and purchase authentic tribal crafts'
    },
    {
      role: 'artisan',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      title: 'Artisan',
      description: 'Sell your traditional crafts and reach a wider audience'
    },
    {
      role: 'volunteer',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>,
      title: 'Volunteer',
      description: 'Help deliver orders and support the artisan community'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-6">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'hi' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            हिंदी
          </button>
          <button 
            onClick={() => setLanguage('mr')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'mr' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            मराठी
          </button>
          <div className="w-px h-6 bg-gray-300"></div>
          <Globe className="w-5 h-5 text-red-900" />
        </div>
      </nav>

      {/* Hero Slideshow */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          </div>
        ))}
        {/* Slide Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="text-6xl md:text-8xl text-white mb-4 tracking-wider">
              {currentText.title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-2">
              {currentText.subtitle}
            </p>
            <p className="text-xl md:text-2xl text-yellow-300">
              {currentText.description}
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="bg-stone-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-red-900">
            {currentText.continueAs}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(currentText.roles).map(([role, roleData]) => {
              const IconComponent = roleIcons[role];
              return (
                <div
                  key={role}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-red-900/20 min-h-[300px]"
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-2 text-red-900">
                      {roleData.name}
                    </h3>
                    <p className="text-stone-600 mb-6 text-sm">
                      {roleData.tagline}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link to={`/login/${role}`} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-full transition-colors font-medium">
                        {currentText.login}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

  {/* Footer */}
  <Footer />
    </div>
  )
}

export default WelcomePage
