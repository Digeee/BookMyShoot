import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const categories = [
    { name: t('weddingPhotography'), emoji: '💍', color: 'from-pink-400 to-rose-500' },
    { name: t('portraitSessions'), emoji: '👤', color: 'from-blue-400 to-indigo-500' },
    { name: t('eventCoverage'), emoji: '🎉', color: 'from-purple-400 to-fuchsia-500' },
    { name: t('droneVideography'), emoji: '🚁', color: 'from-cyan-400 to-teal-500' }
  ];
  
  const features = [
    {
      id: 1,
      title: t('findPerfectPro'),
      description: t('browseCuratedSelection'),
      emoji: '🔍',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 2,
      title: t('bookPaySecurely'),
      description: t('selectPackage'),
      emoji: '💳',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: t('captureMoments'),
      description: t('enjoyEvent'),
      emoji: '🎊',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Glossy Effect */}
      <section className="text-center py-16 md:py-24 fade-in-up">
        <div className="glass-container max-w-4xl mx-auto p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 gradient-text">
            {t('findPerfectPhotographer')}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('bookTalentedProfessionals')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/search" 
              className="modern-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <span className="text-2xl">🔍</span>
              {t('findProfessionals')}
            </Link>
            <Link 
              to="/register/pro" 
              className="modern-btn bg-gradient-to-r from-white to-gray-50 text-indigo-600 border border-indigo-200 px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-50 hover:to-gray-100 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <span className="text-2xl">💼</span>
              {t('joinAsPro')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Glossy Cards */}
      <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          {t('howItWorks')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="glass-card p-8 rounded-2xl text-center transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="text-3xl">{feature.emoji}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section with Glossy Design */}
      <section className="py-16">
        <div className="glass-container max-w-6xl mx-auto p-8 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            {t('popularCategories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-2xl text-center transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <span className="text-2xl">{category.emoji}</span>
                </div>
                <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="glass-container max-w-3xl mx-auto p-10 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Capture Your Moments?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied clients and talented professionals
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="modern-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;