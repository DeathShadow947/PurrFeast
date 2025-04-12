import React, { useState } from 'react';
import '../styles/AuthForm.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('❌ Invalid email format.');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Something went wrong');
      } else {
        alert(result.message || 'Success!');
        setError('');
      }
    } catch (err) {
      setError('❌ Network error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
        <p>{isLogin ? 'Login to continue exploring meowlicious meals.' : 'Sign up to treat your cat with premium nutrition.'}</p>
        <button onClick={toggleMode}>
          {isLogin ? 'New here? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>

      <div className="auth-right">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {!isLogin && (
            <div className="password-field">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
              title={showPassword.confirm ? 'Hide Password' : 'Show Password'}
            >
              {showPassword.confirm ? '🙈' : '👁️'}
            </span>
          </div>
          
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
