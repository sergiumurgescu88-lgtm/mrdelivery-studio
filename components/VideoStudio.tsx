import React, { useState } from 'react';
import { Play, Download, Wand2, Sliders, Volume2, Video, Image as ImageIcon, Loader2 } from 'lucide-react';
import { GeneratedContent } from '../types';
import { generateHiggsfieldVideo, generateHiggsfieldImage } from '../services/higgsfieldService';
import { MOCK_IMAGES } from '../constants';

interface VideoStudioProps {
  generatedContent?: GeneratedContent;
}

const VideoStudio: React.FC<VideoStudioProps> = ({ generatedContent }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  // Editable Prompts
  const [imagePrompt, setImagePrompt] = useState(generatedContent?.imagePrompt || "");
  const [videoPrompt, setVideoPrompt] = useState(generatedContent?.videoPrompt || "");

  // Update local state when prop changes
  React.useEffect(() => {
    if (generatedContent) {
      setImagePrompt(generatedContent.imagePrompt);
      setVideoPrompt(generatedContent.videoPrompt);
    }
  }, [generatedContent]);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    const result = await generateHiggsfieldImage(imagePrompt);
    setGeneratedImage(result.imageUrl);
    setIsGenerating(false);
  };

  const handleGenerateVideo = async () => {
    if (!generatedImage && !videoPrompt) return;
    setIsGenerating(true);
    const result = await generateHiggsfieldVideo(videoPrompt, generatedImage, {});
    setGeneratedVideo(result.videoUrl);
    setIsGenerating(false);
  };

  return (
    <div className="flex h-full bg-studio-900 text-white">
      {/* Settings Panel */}
      <div className="w-96 border-r border-studio-800 overflow-y-auto bg-studio-900 p-6 flex-shrink-0">
        <h2 className="text-lg font-bold mb-6 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-studio-accent" />
          Cinema Studio
        </h2>

        {/* Workflow Tabs */}
        <div className="flex bg-studio-800 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'image' ? 'bg-studio-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            1. Start Frame
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'video' ? 'bg-studio-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            2. Animation
          </button>
        </div>

        {activeTab === 'image' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Start Frame Prompt
              </label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={8}
                placeholder="Describe the initial scene..."
                className="w-full bg-studio-800 border border-studio-700 rounded-lg p-3 text-sm text-gray-200 focus:border-studio-accent focus:outline-none resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Aspect Ratio</label>
                <select className="w-full bg-studio-800 border border-studio-700 rounded p-2 text-sm">
                  <option>16:9 (Cinema)</option>
                  <option>9:16 (TikTok)</option>
                  <option>1:1 (Square)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Model</label>
                <select className="w-full bg-studio-800 border border-studio-700 rounded p-2 text-sm">
                  <option>Nano Banana Pro</option>
                  <option>Flux 2</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-full bg-studio-accent hover:bg-violet-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all"
            >
              {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon className="mr-2 w-4 h-4" />}
              Generate Frame
            </button>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="bg-studio-800 p-3 rounded-lg border border-studio-700 flex items-center space-x-3">
                 <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                     {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-500"/></div>}
                 </div>
                 <div className="text-xs text-gray-400">
                     {generatedImage ? "Using generated frame as reference" : "Please generate a start frame first"}
                 </div>
             </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Motion Prompt
              </label>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                rows={6}
                placeholder="Describe the movement..."
                className="w-full bg-studio-800 border border-studio-700 rounded-lg p-3 text-sm text-gray-200 focus:border-studio-accent focus:outline-none resize-none"
              />
            </div>

            {/* Camera Controls */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Camera Control
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-studio-800 hover:bg-studio-700 p-2 rounded text-xs text-center border border-studio-700">Crash Zoom</button>
                <button className="bg-studio-800 hover:bg-studio-700 p-2 rounded text-xs text-center border border-studio-700">Dolly Out</button>
                <button className="bg-studio-800 hover:bg-studio-700 p-2 rounded text-xs text-center border border-studio-700">Orbit Left</button>
                <button className="bg-studio-800 hover:bg-studio-700 p-2 rounded text-xs text-center border border-studio-700">Bullet Time</button>
              </div>
            </div>

            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating || !generatedImage}
              className="w-full bg-studio-secondary hover:bg-pink-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all"
            >
              {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Video className="mr-2 w-4 h-4" />}
              Produce Video (15s)
            </button>
          </div>
        )}
        
        {/* Voice Info */}
        {generatedContent && (
            <div className="mt-8 pt-6 border-t border-studio-700">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Director's Notes
                </h3>
                <div className="bg-studio-800/50 p-4 rounded-lg text-sm space-y-2">
                    <p><span className="text-studio-accent">Voice:</span> {generatedContent.voiceGuidance.recommendedVoice}</p>
                    <p><span className="text-studio-accent">Tone:</span> {generatedContent.voiceGuidance.tonality}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {generatedContent.voiceGuidance.cues.map((cue, i) => (
                            <span key={i} className="px-2 py-1 bg-studio-700 rounded text-xs text-gray-300">{cue}</span>
                        ))}
                    </div>
                </div>
            </div>
        )}

      </div>

      {/* Preview Area */}
      <div className="flex-1 p-10 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-studio-800 via-studio-900 to-black">
        <div className="absolute top-6 right-6 flex space-x-2">
            <button className="p-2 bg-studio-800 rounded-full hover:bg-studio-700 transition-colors">
                <Download className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        {activeTab === 'image' ? (
           <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-studio-800 relative group">
                {generatedImage ? (
                    <img src={generatedImage} alt="Generated Frame" className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-600">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>No frame generated yet</p>
                        </div>
                    </div>
                )}
           </div>
        ) : (
            <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl border border-studio-800 relative group">
                 {generatedVideo ? (
                    <video src={generatedVideo} controls autoPlay loop className="w-full h-full object-cover" />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-studio-900">
                        {generatedImage ? (
                            <img src={generatedImage} className="w-full h-full object-cover opacity-50" />
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                             <div className="text-center text-gray-500">
                                <Video className="w-12 h-12 mx-auto mb-4 opacity-40" />
                                <p>Ready to animate</p>
                            </div>
                        </div>
                    </div>
                 )}
            </div>
        )}
        
        {generatedContent && (
             <div className="mt-8 text-center max-w-2xl">
                 <p className="text-studio-accent text-sm font-semibold tracking-widest uppercase mb-2">Current Story Arc</p>
                 <p className="text-gray-400 italic font-light text-lg">"{generatedContent.storyArc}"</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default VideoStudio;