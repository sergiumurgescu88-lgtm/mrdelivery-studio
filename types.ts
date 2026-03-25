export type Language = 'romanian' | 'english';

export interface QuestionOption {
  id: string;
  text: string;
  meta?: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface CineGenState {
  step: 'greeting' | 'character' | 'questions' | 'generating' | 'results';
  language: Language;
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  character?: {
    type: 'upload' | 'create';
    data: string; // URL or Description
  };
  generatedContent?: GeneratedContent;
}

export interface GeneratedContent {
  imagePrompt: string;
  videoPrompt: string;
  voiceGuidance: VoiceGuidance;
  storyArc: string;
}

export interface VoiceGuidance {
  recommendedVoice: string;
  tonality: string;
  cues: string[];
}

export interface VideoConfig {
  aspectRatio: '16:9' | '9:16' | '1:1';
  duration: '5s' | '10s' | '15s';
  resolution: '1080p' | '4K';
  motion: 'static' | 'pan' | 'zoom' | 'handheld';
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  CINEGEN = 'cinegen',
  STUDIO = 'studio',
  ASSETS = 'assets'
}