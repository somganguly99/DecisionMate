import React from 'react';
import { Lightbulb } from 'lucide-react';

export function Hero() {
  const scrollToDecisionMaker = () => {
    const element = document.getElementById('decision-maker');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[400px] sm:min-h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <Lightbulb size={32} className="text-yellow-300 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
          Make Better Decisions,{' '}
          <span className="text-yellow-300 block sm:inline">Together</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
          Transform complex choices into clear decisions with our powerful decision-making tool. 
          Analyze options, weigh pros and cons, and arrive at the best choice with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button 
            onClick={scrollToDecisionMaker}
            className="px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 text-sm sm:text-base"
          >
            Get Started
          </button>
          <a 
            href="#features"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors text-sm sm:text-base"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
