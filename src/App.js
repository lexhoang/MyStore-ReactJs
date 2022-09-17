import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Btn.css'

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LogInPage from "./pages/LogInPage";
import ProductInfo from "./pages/ProductInfoPage";
import CartPage from "./pages/CartPage";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/:productId" element={<ProductInfo />}></Route>
        <Route path="/products/:productId" element={<ProductInfo />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
