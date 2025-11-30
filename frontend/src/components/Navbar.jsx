import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">BookMyShoot</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/search" className="text-gray-700 hover:text-indigo-600">Find Pros</Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;