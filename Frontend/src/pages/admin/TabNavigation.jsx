
import React from 'react';
import { Users, Building2 } from 'lucide-react';

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'individuals',
      label: 'Individual Donors',
      icon: <Users className="w-4 h-4" />,
      count: null // Will be calculated by parent if needed
    },
    {
      id: 'bloodbanks',
      label: 'Blood Banks',
      icon: <Building2 className="w-4 h-4" />,
      count: null
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            } group inline-flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 ease-in-out rounded-t-lg`}
          >
            <div className={`${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            } transition-colors duration-200`}>
              {tab.icon}
            </div>
            <span className="font-semibold">{tab.label}</span>
            {tab.count !== null && (
              <span className={`${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              } ml-2 py-0.5 px-2 rounded-full text-xs font-medium transition-colors duration-200`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabNavigation;