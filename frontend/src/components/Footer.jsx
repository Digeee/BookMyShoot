import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookMyShoot</h3>
            <p className="text-gray-300">Connecting clients with talented photographers, videographers, and editors in Sri Lanka.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Find Professionals</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Join as Pro</a></li>
              <li><a href="#" className="hover:text-white">Pro Resources</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 BookMyShoot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;