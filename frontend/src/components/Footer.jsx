import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              BookMyShoot 📸
            </h3>
            <p className="text-gray-300 mb-4">{t('connectingClients')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📸</span>
              </a>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">👥</span> {t('forClients')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>🔍</span> {t('findPros')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>❓</span> {t('howItWorks')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>💰</span> {t('pricing')}
                </a>
              </li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">💼</span> {t('forProfessionals')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>📝</span> {t('joinAsPro')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>📚</span> {t('proResources')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>🏆</span> {t('successStories')}
                </a>
              </li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🎧</span> {t('support')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>💡</span> {t('helpCenter')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>📧</span> {t('contactUs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span>📜</span> {t('termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 BookMyShoot. {t('allRightsReserved')} 🇱🇰</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;