import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const categories = [
    { name: t('weddingPhotography'), icon: '💍' },
    { name: t('portraitSessions'), icon: '👤' },
    { name: t('eventCoverage'), icon: '🎉' },
    { name: t('droneVideography'), icon: '🚁' }
  ];
  
  const features = [
    {
      title: t('findPerfectPro'),
      description: t('browseCuratedSelection'),
      icon: '🔍'
    },
    {
      title: t('bookPaySecurely'),
      description: t('selectPackage'),
      icon: '💳'
    },
    {
      title: t('captureMoments'),
      description: t('enjoyEvent'),
      icon: '🎊'
    }
  ];
  
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="section py-2xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="display-title mb-lg">
            {t('findPerfectPhotographer')}
          </h1>
          <p className="text-xl text-secondary mb-2xl">
            {t('bookTalentedProfessionals')}
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <Link to="/search" className="btn btn-primary">
              {t('findProfessionals')}
            </Link>
            <Link to="/register/pro" className="btn btn-secondary">
              {t('joinAsPro')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <h2 className="section-title text-center mb-2xl">
          {t('howItWorks')}
        </h2>
        <div className="grid md:grid-cols-3 gap-lg">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <div className="text-3xl mb-md">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-sm">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-surface rounded-xl py-2xl">
        <h2 className="section-title text-center mb-2xl">
          {t('popularCategories')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="card text-center">
              <div className="card-content">
                <div className="text-3xl mb-md">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title mb-md">
            Ready to capture your moments?
          </h2>
          <p className="text-secondary mb-lg">
            Join thousands of satisfied clients and talented professionals
          </p>
          <Link to="/register" className="btn btn-accent">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;