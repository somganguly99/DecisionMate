import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Impact = {
  shortTerm: { text: string; weight: number };
  longTerm: { text: string; weight: number };
  risks: { text: string; weight: number };
};

export function EvaluateOutcomes() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [currentOption, setCurrentOption] = useState(0);
  const [impacts, setImpacts] = useState<Impact[]>([
    {
      shortTerm: { text: '', weight: 3 },
      longTerm: { text: '', weight: 3 },
      risks: { text: '', weight: 3 }
    }
  ]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentOption(next)
  };

  const updateImpact = (index: number, type: keyof Impact, field: 'text' | 'weight', value: string | number) => {
    const newImpacts = [...impacts];
    if (!newImpacts[index]) {
      newImpacts[index] = {
        shortTerm: { text: '', weight: 3 },
        longTerm: { text: '', weight: 3 },
        risks: { text: '', weight: 3 }
      };
    }
    newImpacts[index][type][field] = value;
    setImpacts(newImpacts);
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Evaluate Potential Outcomes
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>Consider the potential outcomes of each option.</p>
        
        <Slider {...sliderSettings} className="mb-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="outline-none">
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Option {index + 1}
              </h3>
              
              <div className="space-y-6">
                {/* Short-term Impact */}
                <div className="space-y-2">
                  <label className={`block font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Short-term Impact
                  </label>
                  <textarea
                    value={impacts[index]?.shortTerm.text || ''}
                    onChange={(e) => updateImpact(index, 'shortTerm', 'text', e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-purple-500`}
                    rows={3}
                    placeholder="What are the immediate effects?"
                  />
                  <div className="space-y-1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={impacts[index]?.shortTerm.weight || 3}
                      onChange={(e) => updateImpact(index, 'shortTerm', 'weight', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-sm">
                      <span>Low Impact</span>
                      <span>Weight: {impacts[index]?.shortTerm.weight || 3}</span>
                      <span>High Impact</span>
                    </div>
                  </div>
                </div>

                {/* Long-term Impact */}
                <div className="space-y-2">
                  <label className={`block font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Long-term Impact
                  </label>
                  <textarea
                    value={impacts[index]?.longTerm.text || ''}
                    onChange={(e) => updateImpact(index, 'longTerm', 'text', e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-purple-500`}
                    rows={3}
                    placeholder="What are the potential long-term consequences?"
                  />
                  <div className="space-y-1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={impacts[index]?.longTerm.weight || 3}
                      onChange={(e) => updateImpact(index, 'longTerm', 'weight', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-sm">
                      <span>Low Impact</span>
                      <span>Weight: {impacts[index]?.longTerm.weight || 3}</span>
                      <span>High Impact</span>
                    </div>
                  </div>
                </div>

                {/* Risks */}
                <div className="space-y-2">
                  <label className={`block font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Risks
                  </label>
                  <textarea
                    value={impacts[index]?.risks.text || ''}
                    onChange={(e) => updateImpact(index, 'risks', 'text', e.target.value)}
                    className={`w-full px-4 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-purple-500`}
                    rows={3}
                    placeholder="What could go wrong?"
                  />
                  <div className="space-y-1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={impacts[index]?.risks.weight || 3}
                      onChange={(e) => updateImpact(index, 'risks', 'weight', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="flex justify-between text-sm">
                      <span>Low Risk</span>
                      <span>Weight: {impacts[index]?.risks.weight || 3}</span>
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/explore-options')}
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
          onClick={() => navigate('/decision-confidence')}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
