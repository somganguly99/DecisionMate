import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Share2, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useDecisionStore } from '../../store/decisionStore';
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
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const options = useDecisionStore((state) => state.options);
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

  const handleCloseCelebration = () => {
    setShowCelebrationModal(false);
    navigate('/');
  };

  const shareUrl = 'https://decisionmate.vercel.app/';
  const shareTitle = '🎉 I just made a confident decision using DecisionMate! 🚀 Try it out and make better decisions with structured analysis';
  const shareMessage = `🎯 I just made a confident decision using DecisionMate! 

✨ It helped me analyze my options systematically and choose with confidence. 

🚀 Try it out: ${shareUrl}

#DecisionMaking #ProductivityTools #SmartChoices`;

  const emailSubject = '🎉 I made a great decision with DecisionMate!';
  const emailBody = `Hi there!

I just used DecisionMate to make a really important decision, and I wanted to share this amazing tool with you!

DecisionMate helped me:
✅ Structure my thinking
✅ Weigh all the options
✅ Consider long-term impacts
✅ Make a confident choice

It's completely free and super easy to use. Check it out: ${shareUrl}

Hope it helps you with your decisions too!

Best regards`;

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
                {options.map((option, index) => (
                  <option key={index} value={option.text}>
                    {option.text || `Option ${index + 1}`}
                  </option>
                ))}
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
            disabled={!finalDecision || !reasoning || !nextSteps}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg transition-colors ${
              finalDecision && reasoning && nextSteps
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
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
            Share DecisionMate
          </button>
          
          <button
            onClick={() => navigate('/decision-confidence')}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Previous Step
          </button>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full text-center shadow-2xl`}>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Congratulations!
            </h3>
            <div className="text-4xl mb-4">🚀</div>
            <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You've successfully made your decision using a structured, thoughtful approach!
            </p>
            <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
              <p className={`font-semibold text-lg ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                Your Decision: "{finalDecision}"
              </p>
            </div>
            <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your careful analysis and consideration will lead to better outcomes. Time to put your plan into action!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  setShowShareModal(true);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold transform hover:scale-105 transition-all"
              >
                🎊 Share Your Success!
              </button>
              <button
                onClick={handleCloseCelebration}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors`}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🎉 Share Your Decision Success!
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Help others make better decisions too! Share DecisionMate with your network.
            </p>
            
            <div className="grid grid-cols-5 gap-3 justify-items-center">
              <FacebookShareButton url={shareUrl} quote={shareMessage}>
                <FacebookIcon size={40} round className="hover:scale-110 transition-transform" />
              </FacebookShareButton>
              
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={40} round className="hover:scale-110 transition-transform" />
              </TwitterShareButton>
              
              <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareMessage}>
                <LinkedinIcon size={40} round className="hover:scale-110 transition-transform" />
              </LinkedinShareButton>
              
              <WhatsappShareButton url={shareUrl} title={shareMessage}>
                <WhatsappIcon size={40} round className="hover:scale-110 transition-transform" />
              </WhatsappShareButton>
              
              <EmailShareButton url={shareUrl} subject={emailSubject} body={emailBody}>
                <EmailIcon size={40} round className="hover:scale-110 transition-transform" />
              </EmailShareButton>
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className={`text-xs text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                💡 Sharing helps others discover better decision-making tools!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
