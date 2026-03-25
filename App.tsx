import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CineGenAgent from './components/CineGenAgent';
import VideoStudio from './components/VideoStudio';
import { ViewState, GeneratedContent } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.CINEGEN);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | undefined>(undefined);

  const handleCineGenResults = (content: GeneratedContent) => {
    setGeneratedContent(content);
    // Optional: could automatically switch to studio
    // setCurrentView(ViewState.STUDIO);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.CINEGEN:
        return <CineGenAgent onResultsGenerated={handleCineGenResults} />;
      case ViewState.STUDIO:
        return <VideoStudio generatedContent={generatedContent} />;
      case ViewState.ASSETS:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Asset Library - Coming Soon
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;