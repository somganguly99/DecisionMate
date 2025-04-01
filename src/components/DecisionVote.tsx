import React, { useState } from 'react';
import { Decision } from '../types';

type DecisionVoteProps = {
  decision: Decision;
};

export function DecisionVote({ decision }: DecisionVoteProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const calculateWeightedScore = (option: string) => {
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
      cons: 100 - prosPercentage,
      total: prosPercentage - (100 - prosPercentage) // Net score
    };
  };

  const getBestOption = () => {
    return decision.options.reduce((best, current) => {
      const currentScore = calculateWeightedScore(current).total;
      const bestScore = calculateWeightedScore(best).total;
      return currentScore > bestScore ? current : best;
    }, decision.options[0]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Decision Results</h2>
        <p className="text-gray-600 mb-6">
          Based on the weighted pros and cons you've provided, here's the analysis of your options.
        </p>
      </div>

      <div className="space-y-4">
        {decision.options.map((option, index) => {
          const weightedScore = calculateWeightedScore(option);
          const isSelected = selectedOption === option;
          const isBest = option === getBestOption();

          return (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50'
                  : isBest
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {option || `Option ${index + 1}`}
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="text-green-600">Pros: {weightedScore.pros}%</span>
                    {' vs '}
                    <span className="text-red-600">Cons: {weightedScore.cons}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-red-500"
                      style={{ width: `${weightedScore.pros}%` }}
                    />
                  </div>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  {weightedScore.total > 0 ? '+' : ''}{weightedScore.total}
                </div>
              </div>

              {isBest && (
                <div className="mt-4 py-2 px-4 bg-green-100 text-green-800 rounded-md text-sm">
                  Recommended Choice (Best Weighted Score)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
