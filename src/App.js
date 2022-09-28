import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import RockPaperScissorsGame from './components/Rock-Paper-Scissors-game/';
import EcommerceProductPage from './components/E-commerce-product-page/';
import IntroDropdownNavigation from './components/Intro-doprdown-navigation/';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EcommerceProductPage />} />
          <Route path="/intro-dropdown-navigation" element={<IntroDropdownNavigation />} />
          <Route path="/rock-paper-scissors-game" element={<RockPaperScissorsGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
