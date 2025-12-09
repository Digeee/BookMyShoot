import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary tracking-tight">BookMyShoot</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-primary hover:text-accent transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link to="/search" className="text-primary hover:text-accent transition-colors duration-300 font-medium">
              Find Pros
            </Link>
            <Link to="/login" className="text-primary hover:text-accent transition-colors duration-300 font-medium">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
              Sign Up
            </Link>
            <div className="ml-2">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-accent focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-gray-200 shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-5 space-y-4">
            <Link 
              to="/" 
              className="block px-5 py-3 text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block px-5 py-3 text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Pros
            </Link>
            <Link 
              to="/login" 
              className="block px-5 py-3 text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block px-5 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <button className="btn btn-primary w-full px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Sign Up
              </button>
            </Link>
            <div className="px-5 pt-3 border-t border-gray-100">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;