import React from 'react';
import { BrainCircuit } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <BrainCircuit className="w-6 h-6 text-indigo-400" />
            <span className="ml-2 text-xl font-semibold">DecisionMate</span>
          </div>
          
          <p className="text-indigo-200 text-center md:text-left">
            Making better decisions together through structured analysis and collaborative input.
          </p>
          
          <p className="text-indigo-200 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} DecisionMate
          </p>
        </div>
      </div>
    </footer>
  );
}