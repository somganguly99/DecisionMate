import React, { useState } from 'react';
import { Decision } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { DecisionCreate } from './components/DecisionCreate';
import { DecisionMatrix } from './components/DecisionMatrix';
import { DecisionVote } from './components/DecisionVote';

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'matrix' | 'vote'>('create');
  const [decision, setDecision] = useState<Decision>({
    title: '',
    options: [''],
    pros: {},
    cons: {},
    weights: {},
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-12" id="decision-maker">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {activeTab === 'create' && (
            <DecisionCreate decision={decision} setDecision={setDecision} />
          )}

          {activeTab === 'matrix' && (
            <DecisionMatrix decision={decision} setDecision={setDecision} />
          )}

          {activeTab === 'vote' && (
            <DecisionVote decision={decision} />
          )}
        </div>
      </main>

      <Features />
      <Footer />
    </div>
  );
}

export default App