import React from 'react';
import { Decision } from '../types';

type DecisionCreateProps = {
  decision: Decision;
  setDecision: React.Dispatch<React.SetStateAction<Decision>>;
};

export function DecisionCreate({ decision, setDecision }: DecisionCreateProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecision(prev => ({ ...prev, title: e.target.value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...decision.options];
    newOptions[index] = value;
    setDecision(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setDecision(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Decision</h2>
        <p className="text-gray-600 mb-6">
          Start by giving your decision a title and adding the options you're considering.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Decision Title
          </label>
          <input
            type="text"
            id="title"
            value={decision.title}
            onChange={handleTitleChange}
            placeholder="What decision are you making?"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-2">
            {decision.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another Option
          </button>
        </div>
      </div>
    </div>
  );
}