import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export function UnderstandDecision() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Understand Your Decision
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>Before diving into the details, let's clearly define what decision you're trying to make.</p>
        
        <div className="space-y-4">
          <label className="block">
            <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              What decision are you trying to make?
            </span>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              placeholder="e.g., Choosing a new career path"
            />
          </label>
          
          <label className="block">
            <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Why is this decision important?
            </span>
            <textarea
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              rows={4}
              placeholder="Explain why this decision matters to you..."
            />
          </label>
          
          <label className="block">
            <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              How urgent is this decision?
            </span>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                defaultValue="3"
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-sm">
                <span>Not Urgent</span>
                <span>Somewhat Urgent</span>
                <span>Very Urgent</span>
              </div>
            </div>
          </label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/clarify-priorities')}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
