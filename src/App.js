import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import AuthForm from './pages/AuthForm';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
    
  );
}

export default App;
