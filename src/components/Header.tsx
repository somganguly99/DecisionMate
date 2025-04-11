import React, { useState } from "react";
import { Scale, ListChecks, Vote, BrainCircuit, Menu, X, LogIn } from "lucide-react";

type HeaderProps = {
  activeTab: "create" | "matrix" | "vote";
  setActiveTab: (tab: "create" | "matrix" | "vote") => void;
  onSignInClick: () => void;
};

export function Header({ activeTab, setActiveTab, onSignInClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "create", label: "Create", icon: ListChecks },
    { id: "matrix", label: "Matrix", icon: Scale },
    { id: "vote", label: "Vote", icon: Vote },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              DecisionMate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as "create" | "matrix" | "vote")}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>
            
            <button
              onClick={onSignInClick}
              className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as "create" | "matrix" | "vote");
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onSignInClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
