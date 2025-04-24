import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Share2, X } from 'lucide-react';
import Confetti from 'react-confetti';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

export function MakeDecision() {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [finalDecision, setFinalDecision] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  const handleFinalize = () => {
    if (finalDecision && reasoning && nextSteps) {
      setShowConfetti(true);
      setShowCelebrationModal(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const shareUrl = window.location.href;
  const shareTitle = `I made my decision using DecisionMate: ${finalDecision}`;

  return (
    <>
      {showConfetti && <Confetti />}
      
      <div className={`max-w-2xl mx-auto p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Make Your Decision
        </h1>
        
        <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Based on your analysis, it's time to make your final decision.</p>
          
          <div className="space-y-4">
            <label className="block">
              <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Your Final Decision
              </span>
              <select
                value={finalDecision}
                onChange={(e) => setFinalDecision(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
              >
                <option value="">Select your decision</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </label>
            
            <label className="block">
              <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Reasoning
              </span>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
                rows={4}
                placeholder="Explain why you chose this option..."
              />
            </label>
            
            <label className="block">
              <span className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Next Steps
              </span>
              <textarea
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
                rows={4}
                placeholder="What are your immediate next steps?"
              />
            </label>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={handleFinalize}
            className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Check className="w-5 h-5 mr-2" />
            Finalize Decision
          </button>
          
          <button
            onClick={() => setShowShareModal(true)}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            } transition-colors`}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Decision
          </button>
          
          <button
            onClick={() => navigate('/decision-confidence')}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Previous Step
          </button>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full mx-4 text-center`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🎉 Congratulations!
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You've made a well-thought-out decision. Your careful analysis and consideration will lead to better outcomes!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Share Your Decision
              </button>
              <button
                onClick={() => setShowCelebrationModal(false)}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full mx-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Share Your Decision
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center space-x-4">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton url={shareUrl} subject={shareTitle}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
