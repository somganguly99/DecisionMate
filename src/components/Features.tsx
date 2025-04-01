import React from 'react';
import { ClipboardList, Grid, Vote, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: ClipboardList,
      title: 'Decision Creation',
      description: 'Easily create and structure your decisions with our intuitive interface. Add options, criteria, and descriptions to clarify your choices.'
    },
    {
      icon: Grid,
      title: 'Decision Matrix',
      description: 'Visualize and compare options using our powerful decision matrix. Score criteria and see clear comparisons to make informed choices.'
    },
    {
      icon: Vote,
      title: 'Voting System',
      description: 'Gather input from stakeholders with our flexible voting system. Multiple voting methods ensure fair and accurate group decisions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Work together in real-time with team members. Share decisions, collect feedback, and reach consensus efficiently.'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Decisions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive toolkit helps you make decisions with confidence through collaborative and data-driven approaches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}