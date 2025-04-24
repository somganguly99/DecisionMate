import React, { useState, useEffect } from "react";
import { Scale, ListChecks, Vote, BrainCircuit, Menu, X, LogIn, LogOut, Sun, Moon } from "lucide-react";
import { useThemeStore } from '../store/themeStore';
import { useLocation, useNavigate } from 'react-router-dom';

type HeaderProps = {
  onSignInClick: () => void;
};

export function Header({ onSignInClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <BrainCircuit className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
            <span className="ml-2 text-xl font-semibold">
              DecisionMate
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {user.picture && (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-400 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-gray-600 mr-2" />
                  Dark Mode
                </>
              )}
            </button>
            
            {user ? (
              <>
                <div className="flex items-center px-4 py-2">
                  {user.picture && (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg mt-2"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onSignInClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg mt-2"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
