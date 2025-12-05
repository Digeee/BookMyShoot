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
    <div className="min-h-screen flex items-center justify-center bg-background py-2xl">
      <div className="card w-full max-w-md">
        <div className="card-content">
          <div className="text-center mb-2xl">
            <h2 className="section-title mb-sm">{t('signIn')}</h2>
            <p className="text-secondary">{t('signInToYourAccount')}</p>
          </div>
          
          <form onSubmit={onSubmit}>
            {error && (
              <div className="bg-error/10 border border-error/20 text-error rounded-md p-md mb-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-lg">
              <div>
                <label htmlFor="email-address" className="form-label">
                  {t('email')}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="form-input"
                  placeholder={t('email')}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">
                  {t('password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="form-input"
                  placeholder={t('password')}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-lg mb-xl">
              <div className="text-sm">
                <Link to="/register" className="text-primary hover:text-secondary transition-colors">
                  {t('dontHaveAccount')} {t('signUp')}
                </Link>
              </div>
              <div className="text-sm">
                <a href="#" className="text-primary hover:text-secondary transition-colors">
                  {t('forgotPassword')}?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? `${t('signingIn')}...` : t('signIn')}
            </button>
          </form>
          
          <div className="mt-xl">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-md bg-surface text-secondary">
                  {t('orContinueWith')}
                </span>
              </div>
            </div>
            
            <div className="mt-lg grid grid-cols-2 gap-md">
              <button className="btn btn-secondary flex items-center justify-center gap-sm">
                <span>🇬</span>
                Google
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-sm">
                <span>📱</span>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;