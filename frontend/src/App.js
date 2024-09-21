import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from './components/Pizza';
import Burger from './components/Burgers';
import Gujrati from './components/Gujrati';
import Dessert from './components/Deserts';
import Thali from './components/Thali'
import SouthIndian from './components/south';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pizza" element={<Pizza />} />
          <Route path="burger" element={<Burger />} />
          <Route path="gujrati" element={<Gujrati />} />
          <Route path="Desert" element={<Dessert />} />
          <Route path="/thali" element={<Thali />} />
          <Route path="/south" element={<SouthIndian />} />

          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reviews" element={<ReviewsPage />} /> */}
        </Routes>
      </Router>    </div>
  );
}

export default App;
