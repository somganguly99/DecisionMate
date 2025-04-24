import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export function ClarifyPriorities() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [priorities, setPriorities] = useState([{ text: '', weight: 3 }]);

  const addPriority = () => {
    setPriorities([...priorities, { text: '', weight: 3 }]);
  };

  const removePriority = (index: number) => {
    setPriorities(priorities.filter((_, i) => i !== index));
  };

  const updatePriority = (index: number, text: string) => {
    const newPriorities = [...priorities];
    newPriorities[index].text = text;
    setPriorities(newPriorities);
  };

  const updateWeight = (index: number, weight: number) => {
    const newPriorities = [...priorities];
    newPriorities[index].weight = weight;
    setPriorities(newPriorities);
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Clarify Your Priorities
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>What matters most to you in making this decision? Let's identify your key priorities.</p>
        
        <div className="space-y-4">
          {priorities.map((priority, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={priority.text}
                  onChange={(e) => updatePriority(index, e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-purple-500`}
                  placeholder={`Priority ${index + 1}`}
                />
                {priorities.length > 1 && (
                  <button
                    onClick={() => removePriority(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={priority.weight}
                  onChange={(e) => updateWeight(index, parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-sm">
                  <span>Less Important</span>
                  <span className="font-medium">Weight: {priority.weight}</span>
                  <span>Very Important</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addPriority}
          className={`flex items-center px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Another Priority
        </button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/')}
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
          onClick={() => navigate('/explore-options')}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
