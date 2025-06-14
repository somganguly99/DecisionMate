import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Share2, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full mx-4 text-center`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🎉 Congratulations on Making Your Decision!
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You've taken a thoughtful approach to this decision. Your careful analysis and consideration will lead to better outcomes. Time to put your plan into action!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  setShowShareModal(true);
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                🚀 Share Your Success!
              </button>
              <button
                onClick={handleCloseCelebration}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Return to Home
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
