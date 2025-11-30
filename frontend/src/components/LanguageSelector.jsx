import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Save preference to localStorage
    localStorage.setItem('language', lng);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="language-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {i18n.language === 'en' && 'English'}
          {i18n.language === 'si' && 'සිංහල'}
          {i18n.language === 'ta' && 'தமிழ்'}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
          <button
            onClick={() => changeLanguage('en')}
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
              i18n.language === 'en' ? 'bg-gray-100' : ''
            }`}
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('si')}
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
              i18n.language === 'si' ? 'bg-gray-100' : ''
            }`}
            role="menuitem"
          >
            සිංහල
          </button>
          <button
            onClick={() => changeLanguage('ta')}
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
              i18n.language === 'ta' ? 'bg-gray-100' : ''
            }`}
            role="menuitem"
          >
            தமிழ்
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;