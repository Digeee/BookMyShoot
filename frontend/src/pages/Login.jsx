import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect based on user role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (data.user.role === 'pro') {
          navigate('/dashboard/pro');
        } else {
          navigate('/dashboard/client');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="glass-container max-w-md w-full space-y-8 p-8 rounded-3xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
            <span className="text-3xl text-white">🔐</span>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 gradient-text">
            {t('signIn')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('signInToYourAccount')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100">
              <div className="text-sm text-red-700 flex items-center gap-2">
                <span className="text-lg">⚠️</span> {error}
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">📧</span>
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="glass-card appearance-none relative block w-full pl-10 pr-3 py-4 border border-gray-200 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  placeholder={t('email')}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">🔒</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="glass-card appearance-none relative block w-full pl-10 pr-3 py-4 border border-gray-200 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  placeholder={t('password')}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1 transition-colors">
                <span>📝</span> {t('dontHaveAccount')} {t('signUp')}
              </Link>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                {t('forgotPassword')}?
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="modern-btn group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> 
                  {t('signingIn')}...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🔑</span> {t('signIn')}
                </span>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('orContinueWith')}
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a href="#" className="glass-card w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <span>🇬</span>
                Google
              </a>
            </div>
            <div>
              <a href="#" className="glass-card w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <span>📱</span>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;