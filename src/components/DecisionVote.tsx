import React, { useState } from 'react';
import { Decision } from '../types';

type DecisionVoteProps = {
  decision: Decision;
};

export function DecisionVote({ decision }: DecisionVoteProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const calculateScore = (option: string) => {
    const pros = decision.pros[option]?.length || 0;
    const cons = decision.cons[option]?.length || 0;
    const weight = decision.weights[option] || 1;
    return (pros - cons) * weight;
  };

  const getBestOption = () => {
    return decision.options.reduce((best, current) => {
      const currentScore = calculateScore(current);
      const bestScore = calculateScore(best);
      return currentScore > bestScore ? current : best;
    }, decision.options[0]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Decision Results</h2>
        <p className="text-gray-600 mb-6">
          Based on the pros, cons, and weights you've provided, here's the analysis of your options.
        </p>
      </div>

      <div className="space-y-4">
        {decision.options.map((option, index) => {
          const score = calculateScore(option);
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
                    <span className="text-green-600">{decision.pros[option]?.length || 0} Pros</span>
                    {' vs '}
                    <span className="text-red-600">{decision.cons[option]?.length || 0} Cons</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  {score > 0 ? '+' : ''}{score}
                </div>
              </div>

              {isBest && (
                <div className="mt-4 py-2 px-4 bg-green-100 text-green-800 rounded-md text-sm">
                  Recommended Choice
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}