import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDecisionStore } from '../../store/decisionStore';

export function ExploreOptions() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const setOptions = useDecisionStore((state) => state.setOptions);
  const [options, setLocalOptions] = useState(['']);

  const addOption = () => {
    setLocalOptions([...options, '']);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setLocalOptions(newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setLocalOptions(newOptions);
  };

  const handleNext = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length > 0) {
      setOptions(validOptions);
      navigate('/evaluate-outcomes');
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Explore Your Options
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>List all possible options you're considering for this decision.</p>
        
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
                placeholder={`Option ${index + 1}`}
              />
              {options.length > 1 && (
                <button
                  onClick={() => removeOption(index)}
                  className={`p-2 rounded-md ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={addOption}
          className={`flex items-center px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Another Option
        </button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/clarify-priorities')}
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
          onClick={handleNext}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
