import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

export function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-blue-600">Auto</span>Care Pro
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                {user && (
                  <>
                    <span className="text-gray-900 px-3 py-2 text-sm font-medium">Welcome, {user.username}!</span>
                    <button 
                      onClick={handleLogout} 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book Service
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-900 hover:text-blue-600 text-sm font-medium">Contact</a>
              {user && (
                <>
                  <span className="block px-3 py-2 text-gray-900 text-sm font-medium">Welcome, {user.username}!</span>
                  <button 
                    onClick={handleLogout} 
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
              <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
                Book Service
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to AutoCare Pro
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your trusted partner for all automotive needs
          </p>
        </div>
      </main>
    </div>
  );
}
