import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import OutfitAnalyzer from './pages/OutfitAnalyzer';
import EnergyTips from './pages/EnergyTips';
import OutfitOrganizer from './pages/OutfitOrganizer';
import SeasonalQuiz from './pages/SeasonalQuiz';
import SustainablePlanner from './pages/SustainablePlanner';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/analyzer" element={<OutfitAnalyzer />} />
            <Route path="/energy-tips" element={<EnergyTips />} />
            <Route path="/organizer" element={<OutfitOrganizer />} />
            <Route path="/quiz" element={<SeasonalQuiz />} />
            <Route path="/planner" element={<SustainablePlanner />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
