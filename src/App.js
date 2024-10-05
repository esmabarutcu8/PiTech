import "./App.css";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
