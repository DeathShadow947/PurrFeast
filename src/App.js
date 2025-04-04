import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/products" element={<h1>Product Catalog</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
        <Route path="/checkout" element={<h1>Checkout</h1>} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}


export default App;


