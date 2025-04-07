import React, { useState } from 'react';
import '../styles/AuthForm.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
        <p>{isLogin ? 'Login and keep the purring going!' : 'Sign up and treat your cat to premium PurrFeast meals!'}</p>
        <button onClick={toggleMode}>
          {isLogin ? 'New here? Sign Up' : 'Already a member? Login'}
        </button>
      </div>

      <div className="auth-right">
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
