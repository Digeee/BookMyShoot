import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-gray-100 sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">BookMyShoot</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-primary hover:text-secondary transition-colors">
              Find Pros
            </Link>
            <Link to="/login" className="text-primary hover:text-secondary transition-colors">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-secondary focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-surface border-t border-gray-100">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Pros
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <button className="btn btn-primary w-full">
                Sign Up
              </button>
            </Link>
            <div className="px-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;