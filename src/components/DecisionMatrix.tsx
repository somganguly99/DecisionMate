import React from 'react';
import { Decision } from '../types';

type DecisionMatrixProps = {
  decision: Decision;
  setDecision: React.Dispatch<React.SetStateAction<Decision>>;
};

export function DecisionMatrix({ decision, setDecision }: DecisionMatrixProps) {
  const handleAddPro = (option: string) => {
    setDecision(prev => ({
      ...prev,
      pros: {
        ...prev.pros,
        [option]: [...(prev.pros[option] || []), { text: '', weight: 1 }]
      }
    }));
  };

  const handleAddCon = (option: string) => {
    setDecision(prev => ({
      ...prev,
      cons: {
        ...prev.cons,
        [option]: [...(prev.cons[option] || []), { text: '', weight: 1 }]
      }
    }));
  };

  const handleProChange = (option: string, index: number, value: string) => {
    setDecision(prev => ({
      ...prev,
      pros: {
        ...prev.pros,
        [option]: prev.pros[option].map((pro, i) => 
          i === index ? { ...pro, text: value } : pro
        )
      }
    }));
  };

  const handleProWeightChange = (option: string, index: number, weight: number) => {
    setDecision(prev => ({
      ...prev,
      pros: {
        ...prev.pros,
        [option]: prev.pros[option].map((pro, i) => 
          i === index ? { ...pro, weight } : pro
        )
      }
    }));
  };

  const handleConChange = (option: string, index: number, value: string) => {
    setDecision(prev => ({
      ...prev,
      cons: {
        ...prev.cons,
        [option]: prev.cons[option].map((con, i) => 
          i === index ? { ...con, text: value } : con
        )
      }
    }));
  };

  const handleConWeightChange = (option: string, index: number, weight: number) => {
    setDecision(prev => ({
      ...prev,
      cons: {
        ...prev.cons,
        [option]: prev.cons[option].map((con, i) => 
          i === index ? { ...con, weight } : con
        )
      }
    }));
  };

  const calculateWeightedProsConsRatio = (option: string) => {
    const prosWeights = (decision.pros[option] || [])
      .filter(pro => pro.text.trim())
      .reduce((sum, pro) => sum + pro.weight, 0);
      
    const consWeights = (decision.cons[option] || [])
      .filter(con => con.text.trim())
      .reduce((sum, con) => sum + con.weight, 0);
    
    const totalWeight = prosWeights + consWeights;
    
    if (totalWeight === 0) return { pros: 50, cons: 50 };
    
    const prosPercentage = Math.round((prosWeights / totalWeight) * 100);
    return {
      pros: prosPercentage,
      cons: 100 - prosPercentage
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Decision Matrix</h2>
        <p className="text-gray-600 mb-6">
          List the pros and cons for each option and set their weights to evaluate your choices.
        </p>
      </div>

      <div className="space-y-8">
        {decision.options.map((option, index) => {
          const ratio = calculateWeightedProsConsRatio(option);
          return (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {option || `Option ${index + 1}`}
              </h3>

              {/* Weighted Pros vs Cons Percentage Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600">Pros: {ratio.pros}%</span>
                  <span className="text-red-600">Cons: {ratio.cons}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-red-500"
                    style={{ width: `${ratio.pros}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pros</h4>
                  <div className="space-y-3">
                    {(decision.pros[option] || []).map((pro, proIndex) => (
                      <div key={proIndex} className="space-y-2">
                        <input
                          type="text"
                          value={pro.text}
                          onChange={(e) => handleProChange(option, proIndex, e.target.value)}
                          placeholder="Add a pro"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={pro.weight}
                            onChange={(e) => handleProWeightChange(option, proIndex, parseInt(e.target.value))}
                            className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                          />
                          <span className="text-sm text-gray-600 w-20">Weight: {pro.weight}</span>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddPro(option)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      + Add Pro
                    </button>
                  </div>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cons</h4>
                  <div className="space-y-3">
                    {(decision.cons[option] || []).map((con, conIndex) => (
                      <div key={conIndex} className="space-y-2">
                        <input
                          type="text"
                          value={con.text}
                          onChange={(e) => handleConChange(option, conIndex, e.target.value)}
                          placeholder="Add a con"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={con.weight}
                            onChange={(e) => handleConWeightChange(option, conIndex, parseInt(e.target.value))}
                            className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                          />
                          <span className="text-sm text-gray-600 w-20">Weight: {con.weight}</span>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddCon(option)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      + Add Con
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
