import React, { useState, useEffect, useRef } from 'react';
import { Send, Upload, User, Sparkles, MessageSquare, Play, RefreshCw } from 'lucide-react';
import { CineGenState, Language, Question, GeneratedContent } from '../types';
import { QUESTIONS_DATA, generateCineGenPrompts } from '../services/cinegenLogic';

interface CineGenAgentProps {
  onResultsGenerated: (content: GeneratedContent) => void;
}

const CineGenAgent: React.FC<CineGenAgentProps> = ({ onResultsGenerated }) => {
  const [state, setState] = useState<CineGenState>({
    step: 'greeting',
    language: 'english',
    currentQuestionIndex: 0,
    answers: {},
  });
  
  const [messages, setMessages] = useState<Array<{role: 'agent' | 'user', text: string | React.ReactNode}>>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Greeting
  useEffect(() => {
    setMessages([
      {
        role: 'agent',
        text: (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-studio-accent to-studio-secondary">
              🎬 WELCOME TO CINEGEN!
            </h2>
            <p>
              I'm your visual alchemist. In 5 questions, we'll transform your idea into a cinematic experience.
            </p>
            <p className="text-sm text-gray-400">
              Before we start, do you have a character in mind? You can upload a photo or I'll create one magically.
            </p>
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => handleCharacterSelection('upload')}
                className="flex items-center px-4 py-2 bg-studio-700 hover:bg-studio-600 rounded-lg text-sm transition-colors border border-studio-600"
              >
                <Upload className="w-4 h-4 mr-2 text-blue-400" />
                Upload Photo
              </button>
              <button 
                onClick={() => handleCharacterSelection('create')}
                className="flex items-center px-4 py-2 bg-studio-700 hover:bg-studio-600 rounded-lg text-sm transition-colors border border-studio-600"
              >
                <User className="w-4 h-4 mr-2 text-pink-400" />
                Create Character
              </button>
            </div>
          </div>
        )
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCharacterSelection = (type: 'upload' | 'create') => {
    setState(prev => ({ ...prev, step: 'character', character: { type, data: '' } }));
    setMessages(prev => [...prev, 
      { role: 'user', text: type === 'upload' ? "I want to upload a photo." : "Create a character for me." },
      { role: 'agent', text: type === 'upload' ? "Please provide the image URL (for demo) or describe the photo." : "Describe the character you envision." }
    ]);
  };

  const handleMessageSubmit = () => {
    if (!inputValue.trim()) return;
    
    const userInput = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);

    if (state.step === 'character') {
      // Transition to Questions
      setState(prev => ({ 
        ...prev, 
        step: 'questions', 
        character: { ...prev.character!, data: userInput },
        currentQuestionIndex: 0
      }));
      
      // Add a small delay for natural feeling
      setTimeout(() => {
        askQuestion(0);
      }, 500);
    }
  };

  const askQuestion = (index: number) => {
    const questions = QUESTIONS_DATA[state.language];
    if (index >= questions.length) {
      finishQuestions();
      return;
    }

    const q = questions[index];
    setMessages(prev => [...prev, {
      role: 'agent',
      text: (
        <div className="space-y-4 animate-fadeIn">
          <p className="font-medium text-lg text-white">{q.text}</p>
          <div className="grid gap-2">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(q.id, opt.id)}
                className="text-left px-4 py-3 bg-studio-800 hover:bg-studio-700 border border-studio-700 hover:border-studio-accent rounded-lg transition-all group"
              >
                <span className="font-bold text-studio-accent mr-2 group-hover:text-white">{opt.id}.</span>
                <span className="text-gray-300 group-hover:text-white">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )
    }]);
  };

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setState(prev => {
      const newAnswers = { ...prev.answers, [questionId]: optionId };
      const nextIndex = prev.currentQuestionIndex + 1;
      
      // Trigger next question or finish
      setTimeout(() => {
        if (nextIndex < QUESTIONS_DATA[prev.language].length) {
          askQuestion(nextIndex);
        } else {
          finishQuestions(newAnswers);
        }
      }, 400);

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: nextIndex
      };
    });
  };

  const finishQuestions = (finalAnswers?: Record<string, string>) => {
    const answers = finalAnswers || state.answers;
    setState(prev => ({ ...prev, step: 'generating' }));
    
    setMessages(prev => [...prev, {
      role: 'agent',
      text: (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <RefreshCw className="w-8 h-8 text-studio-accent animate-spin" />
          <p className="text-center text-gray-300">
            Synthesizing emotional data... <br/>
            Constructing visual storyboard...
          </p>
        </div>
      )
    }]);

    setTimeout(() => {
      const results = generateCineGenPrompts(answers, state.character?.data || "", state.language);
      setState(prev => ({ ...prev, step: 'results', generatedContent: results }));
      onResultsGenerated(results);

      setMessages(prev => [...prev, {
        role: 'agent',
        text: (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Transformation Complete ✨</h3>
            <div className="bg-studio-800 p-4 rounded-lg border border-studio-700 space-y-2">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Visual Signature</p>
                  <p className="text-gray-200 text-sm">{results.storyArc}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300">
              I've prepared your cinematic prompts and voice guidance. Check the <b>Cinema Studio</b> tab to start production!
            </p>
          </div>
        )
      }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-studio-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-studio-accent rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-studio-secondary rounded-full blur-[128px]"></div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-6 space-y-6 z-10">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl rounded-2xl p-5 ${
              msg.role === 'user' 
                ? 'bg-studio-700 text-white rounded-tr-none' 
                : 'bg-studio-800/80 backdrop-blur-md border border-studio-700 text-gray-100 rounded-tl-none shadow-xl'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Only active during character phase or free chat) */}
      {state.step === 'character' && (
        <div className="p-4 border-t border-studio-800 bg-studio-900 z-10">
          <div className="flex space-x-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()}
              placeholder="Type your response..."
              className="flex-1 bg-studio-800 border border-studio-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-accent transition-colors"
            />
            <button
              onClick={handleMessageSubmit}
              className="bg-studio-accent hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition-colors font-medium flex items-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CineGenAgent;