import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDecisionStore } from '../../store/decisionStore';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type SubImpact = { text: string; weight: number };

export function EvaluateOutcomes() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const options = useDecisionStore((state) => state.options);
  const updateOption = useDecisionStore((state) => state.updateOption);

  const updateImpact = (
    optionIndex: number,
    type: 'shortTerm' | 'longTerm' | 'risks',
    impactIndex: number,
    field: keyof SubImpact,
    value: string | number
  ) => {
    const option = options[optionIndex];
    const impacts = [...option[type]];
    impacts[impactIndex] = { ...impacts[impactIndex], [field]: value };
    updateOption(optionIndex, { [type]: impacts });
  };

  const addImpact = (optionIndex: number, type: 'shortTerm' | 'longTerm' | 'risks') => {
    const option = options[optionIndex];
    const impacts = [...option[type], { text: '', weight: 3 }];
    updateOption(optionIndex, { [type]: impacts });
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (options.length === 0) {
    navigate('/explore-options');
    return null;
  }

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Evaluate Potential Outcomes
      </h1>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
        Consider the potential outcomes of each option.
      </p>

      <Slider {...sliderSettings} className="mb-8">
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="outline-none">
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {option.text}
            </h3>

            {(['shortTerm', 'longTerm', 'risks'] as const).map((impactType) => (
              <div key={impactType} className="mb-6">
                <h4 className={`text-md font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} capitalize`}>
                  {impactType.replace(/([A-Z])/g, ' $1')} Impact
                </h4>

                {option[impactType].map((impact, i) => (
                  <div key={i} className="mb-4 space-y-2">
                    <textarea
                      value={impact.text}
                      onChange={(e) => updateImpact(optionIndex, impactType, i, 'text', e.target.value)}
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-purple-500`}
                      rows={2}
                      placeholder={`Enter ${impactType.replace(/([A-Z])/g, ' $1').toLowerCase()} impact`}
                    />
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={impact.weight}
                      onChange={(e) =>
                        updateImpact(optionIndex, impactType, i, 'weight', parseInt(e.target.value))
                      }
                      className="w-full accent-purple-500"
                    />
                    <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>Low</span>
                      <span>Weight: {impact.weight}</span>
                      <span>High</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addImpact(optionIndex, impactType)}
                  className={`mt-2 flex items-center gap-2 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  } hover:underline text-sm`}
                >
                  <Plus size={16} /> Add another {impactType.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </button>
              </div>
            ))}
          </div>
        ))}
      </Slider>

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
