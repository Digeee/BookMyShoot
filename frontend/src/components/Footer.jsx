import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BookMyShoot</h3>
            <p className="text-gray-300 mb-6 max-w-md">{t('connectingClients')}</p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                <span className="sr-only">Facebook</span>
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                <span className="sr-only">Twitter</span>
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                <span className="sr-only">Instagram</span>
                <span className="text-lg">📸</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('forClients')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('findPros')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('howItWorks')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('pricing')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('forProfessionals')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('joinAsPro')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('proResources')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('successStories')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('support')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('helpCenter')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('contactUs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {t('termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 BookMyShoot. {t('allRightsReserved')}</p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 mb-2 md:mb-0">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 mb-2 md:mb-0">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 mb-2 md:mb-0">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;