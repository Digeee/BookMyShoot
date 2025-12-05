import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    role: 'client'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { name, email, phone, password, password2, role } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      return setError(t('passwordsDoNotMatch'));
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password, role })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect based on user role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (data.user.role === 'pro') {
          navigate('/onboarding/pro');
        } else {
          navigate('/dashboard/client');
        }
      } else {
        setError(data.error || t('registrationFailed'));
      }
    } catch (err) {
      setError(t('serverError'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-2xl">
      <div className="card w-full max-w-md">
        <div className="card-content">
          <div className="text-center mb-2xl">
            <h2 className="section-title mb-sm">{t('createAccount')}</h2>
            <p className="text-secondary">{t('joinOurCommunity')}</p>
          </div>
          
          <form onSubmit={onSubmit}>
            {error && (
              <div className="bg-error/10 border border-error/20 text-error rounded-md p-md mb-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-lg">
              <div>
                <label htmlFor="name" className="form-label">
                  {t('name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={onChange}
                  className="form-input"
                  placeholder={t('name')}
                />
              </div>
              
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
                <label htmlFor="phone" className="form-label">
                  {t('phone')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={onChange}
                  className="form-input"
                  placeholder={`${t('phone')} (${t('optional')})`}
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="form-input"
                  placeholder={t('password')}
                />
              </div>
              
              <div>
                <label htmlFor="password2" className="form-label">
                  {t('confirmPassword')}
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password2}
                  onChange={onChange}
                  className="form-input"
                  placeholder={t('confirmPassword')}
                />
              </div>
              
              <div>
                <label htmlFor="role" className="form-label">
                  {t('iAm')}
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={onChange}
                  className="form-input"
                >
                  <option value="client">{t('clientLooking')}</option>
                  <option value="pro">{t('professional')}</option>
                </select>
              </div>
            </div>
            
            <div className="mt-lg mb-xl">
              <div className="text-sm">
                <Link to="/login" className="text-primary hover:text-secondary transition-colors">
                  {t('alreadyHaveAccount')} {t('signIn')}
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? `${t('creatingAccount')}...` : t('signUp')}
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

export default Register;