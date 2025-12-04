import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BookMyShoot
              </span>
              <span className="ml-2 text-2xl">📸</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-2">
              <span className="text-lg">🏠</span> Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-2">
              <span className="text-lg">🔍</span> Find Pros
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-2">
              <span className="text-lg">🔑</span> Login
            </Link>
            <Link 
              to="/register" 
              className="modern-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <span className="text-lg">📝</span> Sign Up
            </Link>
            <div ref={menuRef} className="group relative">
              <LanguageSelector />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">🏠</span> Home
            </Link>
            <Link 
              to="/search" 
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">🔍</span> Find Pros
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">🔑</span> Login
            </Link>
            <Link 
              to="/register" 
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl">📝</span> Sign Up
            </Link>
            <div className="px-4 py-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;