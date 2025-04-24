import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

type Option = {
  name: string;
  score: number;
};

export function DecisionConfidence() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [confidence, setConfidence] = useState(50);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Mock data - in a real app, this would come from your state management
  const options: Option[] = [
    { name: 'Option 1', score: 75 },
    { name: 'Option 2', score: 60 },
    { name: 'Option 3', score: 45 }
  ];

  const getBestOption = () => {
    return options.reduce((prev, current) => 
      (prev.score > current.score) ? prev : current
    );
  };

  const bestOption = getBestOption();

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Decision Confidence
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Analysis Summary
          </h2>
          
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.name}
                className={`p-4 rounded-lg border-2 transition-all ${
                  option.name === bestOption.name
                    ? isDarkMode 
                      ? 'border-purple-500 bg-gray-700'
                      : 'border-purple-500 bg-purple-50'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {option.name}
                  </h3>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                    {option.score}%
                  </span>
                </div>
                {option.name === bestOption.name && (
                  <div className={`mt-2 text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                    Recommended Choice
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Your Confidence Level
          </h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Not Confident</span>
              <span>Very Confident</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
            
            <div className="text-center">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {confidence}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block">
            <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              What would help increase your confidence?
            </span>
            <textarea
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              rows={4}
              placeholder="What additional information or analysis would help?"
            />
          </label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/evaluate-outcomes')}
          className={`flex items-center px-6 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </button>
        
        <button
          onClick={() => navigate('/make-decision')}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
