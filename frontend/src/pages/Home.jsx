import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const categories = [
    { name: t('weddingPhotography'), emoji: '💍' },
    { name: t('portraitSessions'), emoji: '👤' },
    { name: t('eventCoverage'), emoji: '🎉' },
    { name: t('droneVideography'), emoji: '🚁' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('findPerfectPhotographer')} 📸
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('bookTalentedProfessionals')} ✨
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/search" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            {t('findProfessionals')} 🔍
          </Link>
          <Link to="/register/pro" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
            {t('joinAsPro')} 💼
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">✨ {t('howItWorks')} ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">🔍 {t('findPerfectPro')}</h3>
            <p className="text-gray-600">
              {t('browseCuratedSelection')} 📚
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">💳 {t('bookPaySecurely')}</h3>
            <p className="text-gray-600">
              {t('selectPackage')} 🎯
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">🎊 {t('captureMoments')}</h3>
            <p className="text-gray-600">
              {t('enjoyEvent')} 🥂
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl my-12">
        <h2 className="text-3xl font-bold text-center mb-12">📂 {t('popularCategories')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-center">
              <div className="text-4xl mb-4">{category.emoji}</div>
              <h3 className="font-medium text-lg">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;