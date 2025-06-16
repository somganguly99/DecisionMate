import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDecisionStore } from '../../store/decisionStore';

export function DecisionConfidence() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [confidence, setConfidence] = useState(50);
  const [confidenceNotes, setConfidenceNotes] = useState('');
  
  // Get actual data from stores
  const options = useDecisionStore((state) => state.options);
  const priorities = JSON.parse(localStorage.getItem('priorities') || '[]');

  // If no options available, redirect back
  if (options.length === 0) {
    navigate('/explore-options');
    return null;
  }

  const calculateWeightedAverage = (impacts: { text: string; weight: number }[]) => {
    const validImpacts = impacts.filter(impact => impact.text.trim() !== '');
    if (validImpacts.length === 0) return 3; // Default neutral score
    
    const totalWeight = validImpacts.reduce((sum, impact) => sum + impact.weight, 0);
    return totalWeight / validImpacts.length;
  };

  const calculateWeightedScore = (option: any) => {
    // Calculate weighted averages for each category
    const shortTermAvg = calculateWeightedAverage(option.shortTerm);
    const longTermAvg = calculateWeightedAverage(option.longTerm);
    const riskAvg = calculateWeightedAverage(option.risks);
    
    // Apply the specified weights: Short-term 25%, Long-term 15%, Risk 60% penalty
    const totalScore = (
      (shortTermAvg * 0.25) +    // 25% - Short-term benefits
      (longTermAvg * 0.15) -     // 15% - Long-term benefits  
      (riskAvg * 0.60)           // 60% - Risk penalty (major factor)
    );
    
    // Convert to percentage, ensuring it doesn't go below 0
    const percentage = Math.max(0, Math.round(((totalScore + 3) / 6) * 100)); // Adjusted scale
    return Math.min(100, percentage);
  };

  const getBestOption = () => {
    if (options.length === 0) return null;
    
    return options.reduce((prev, current) => 
      (calculateWeightedScore(prev) > calculateWeightedScore(current)) ? prev : current
    );
  };

  const bestOption = getBestOption();

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Low Risk, Good Choice';
    if (score >= 50) return 'Moderate Risk';
    if (score >= 30) return 'High Risk';
    return 'Very High Risk';
  };

  const getDetailedBreakdown = (option: any) => {
    const shortTerm = calculateWeightedAverage(option.shortTerm);
    const longTerm = calculateWeightedAverage(option.longTerm);
    const risks = calculateWeightedAverage(option.risks);

    return { shortTerm, longTerm, risks };
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Decision Confidence Analysis
      </h1>
      
      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Risk-Weighted Analysis Results
          </h2>
          
          <div className="space-y-4">
            {options.map((option, index) => {
              const score = calculateWeightedScore(option);
              const breakdown = getDetailedBreakdown(option);
              const isRecommended = bestOption && option.text === bestOption.text;
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isRecommended
                      ? isDarkMode 
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-green-500 bg-green-50'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-medium text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {option.text || `Option ${index + 1}`}
                    </h3>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        isRecommended 
                          ? isDarkMode ? 'text-green-400' : 'text-green-600'
                          : isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {score}%
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getScoreLabel(score)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getScoreColor(score)} transition-all duration-500`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                  
                  {isRecommended && (
                    <div className={`flex items-center justify-center py-2 px-4 rounded-md ${
                      isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'
                    }`}>
                      <span className="text-sm font-medium">🏆 Lowest Risk Option</span>
                    </div>
                  )}
                  
                  {/* Detailed breakdown with weighted averages */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className={`p-2 rounded ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <div className={`${isDarkMode ? 'text-green-300' : 'text-green-700'} font-medium`}>
                        Short-term (25%)
                      </div>
                      <div className="font-bold text-lg">
                        {Math.round(breakdown.shortTerm * 10) / 10}/5
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        Avg of {option.shortTerm.filter(i => i.text.trim()).length} items
                      </div>
                    </div>
                    <div className={`p-2 rounded ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <div className={`${isDarkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>
                        Long-term (15%)
                      </div>
                      <div className="font-bold text-lg">
                        {Math.round(breakdown.longTerm * 10) / 10}/5
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Avg of {option.longTerm.filter(i => i.text.trim()).length} items
                      </div>
                    </div>
                    <div className={`p-2 rounded ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                      <div className={`${isDarkMode ? 'text-red-300' : 'text-red-700'} font-medium`}>
                        Risk (60% penalty)
                      </div>
                      <div className="font-bold text-lg">
                        {Math.round(breakdown.risks * 10) / 10}/5
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                        Avg of {option.risks.filter(i => i.text.trim()).length} items
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Your Confidence Level
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Not Confident</span>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {confidence}% Confident
              </span>
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
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                confidence >= 70 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                  : confidence >= 40
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
              }`}>
                {confidence >= 70 ? '😊 High Confidence' : 
                 confidence >= 40 ? '😐 Moderate Confidence' : 
                 '😟 Low Confidence'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block">
            <span className={`block font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              What would help increase your confidence?
            </span>
            <textarea
              value={confidenceNotes}
              onChange={(e) => setConfidenceNotes(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              rows={4}
              placeholder="Additional research needed, expert consultation, more time to think, risk mitigation strategies..."
            />
          </label>
        </div>

        {bestOption && (
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-900/20 border-purple-500' : 'bg-purple-50 border-purple-200'} border`}>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
              🎯 Risk-Based Recommendation
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
              Based on your risk-weighted analysis, <strong>"{bestOption.text}"</strong> scores {calculateWeightedScore(bestOption)}%. 
              This recommendation heavily considers potential risks alongside short-term and long-term impacts.
            </p>
            <div className={`mt-2 text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
              💡 <em>Lower risk options are prioritized in this analysis</em>
            </div>
          </div>
        )}
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
          Make Final Decision
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
