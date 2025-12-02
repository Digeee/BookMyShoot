import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-800 text-white py-8 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookMyShoot 📸</h3>
            <p className="text-gray-300">{t('connectingClients')} ✨</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">👥 {t('forClients')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white flex items-center gap-1">🔍 {t('findPros')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">❓ {t('howItWorks')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">💰 {t('pricing')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">💼 {t('forProfessionals')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white flex items-center gap-1">📝 {t('joinAsPro')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">📚 {t('proResources')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">🏆 {t('successStories')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">🎧 {t('support')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white flex items-center gap-1">💡 {t('helpCenter')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">📧 {t('contactUs')}</a></li>
              <li><a href="#" className="hover:text-white flex items-center gap-1">📜 {t('termsOfService')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 BookMyShoot. {t('allRightsReserved')} 🇱🇰</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;