import React from 'react';
import { LayoutDashboard, Clapperboard, Film, Library, Settings, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.CINEGEN, label: 'CineGen Agent', icon: Sparkles, highlight: true },
    { id: ViewState.STUDIO, label: 'Cinema Studio', icon: Clapperboard },
    { id: ViewState.ASSETS, label: 'Asset Library', icon: Library },
  ];

  return (
    <div className="w-64 h-screen bg-studio-900 border-r border-studio-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-studio-accent to-studio-secondary">
          MrDelivery Studio
        </h1>
        <p className="text-xs text-gray-500 mt-1">Powered by Higgsfield</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-studio-800 text-white shadow-lg shadow-studio-900/50'
                : 'text-gray-400 hover:bg-studio-800/50 hover:text-white'
            }`}
          >
            <item.icon
              className={`w-5 h-5 mr-3 ${
                item.highlight && currentView !== item.id ? 'text-studio-accent' : ''
              } ${currentView === item.id ? 'text-studio-accent' : ''}`}
            />
            <span className="font-medium">{item.label}</span>
            {item.highlight && (
              <span className="ml-auto w-2 h-2 rounded-full bg-studio-accent animate-pulse"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-studio-800">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors w-full px-4 py-2">
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;