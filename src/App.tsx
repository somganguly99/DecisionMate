import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroS } from './components/Hero';
import { UnderstandDecision } from './components/decision-path/UnderstandDecision';
import { ClarifyPriorities } from './components/decision-path/ClarifyPriorities';
import { ExploreOptions } from './components/decision-path/ExploreOptions';
import { EvaluateOutcomes } from './components/decision-path/EvaluateOutcomes';
import { DecisionConfidence } from './components/decision-path/DecisionConfidence';
import { MakeDecision } from './components/decision-path/MakeDecision';
import { SignIn } from './components/SignIn';

function App() {
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header onSignInClick={() => setIsSignInOpen(true)} />
      <HeroS />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<UnderstandDecision />} />
          <Route path="/clarify-priorities" element={<ClarifyPriorities />} />
          <Route path="/explore-options" element={<ExploreOptions />} />
          <Route path="/evaluate-outcomes" element={<EvaluateOutcomes />} />
          <Route path="/decision-confidence" element={<DecisionConfidence />} />
          <Route path="/make-decision" element={<MakeDecision />} />
        </Routes>
      </main>

      <Footer />
      
      <SignIn 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
}

export default App;
