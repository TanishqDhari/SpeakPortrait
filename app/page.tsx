'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import InputSelector from '@/components/InputSelector';
import VideoOutput from '@/components/VideoOutput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2 } from 'lucide-react';

export interface GenerationState {
  image: File | null;
  inputType: 'text' | 'audio';
  textInput: string;
  audioFile: File | null;
  isLoading: boolean;
  error: string | null;
  generatedVideo: string | null;
}

export default function SpeakPortraitApp() {
  const [state, setState] = useState<GenerationState>({
    image: null,
    inputType: 'text',
    textInput: '',
    audioFile: null,
    isLoading: false,
    error: null,
    generatedVideo: null,
  });

  const updateState = (updates: Partial<GenerationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {

    if (!state.image) {
      updateState({ error: 'Please upload an image first.' });
      return;
    }

    if (state.inputType === 'text' && !state.textInput.trim()) {
      updateState({ error: 'Please enter some text to generate speech.' });
      return;
    }

    if (state.inputType === 'audio' && !state.audioFile) {
      updateState({ error: 'Please upload an audio file.' });
      return;
    }

    updateState({ isLoading: true, error: null, generatedVideo: null });

    try {
      const formData = new FormData();
      formData.append('image', state.image);
      
      if (state.inputType === 'text') {
        formData.append('text', state.textInput);
      } else {
        formData.append('audio', state.audioFile!);
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.video_url) {
        updateState({ generatedVideo: result.video_url });
      } else {
        throw new Error('No video URL returned from server');
      }
    } catch (error) {
      console.error('Generation error:', error);
      updateState({ 
        error: error instanceof Error 
          ? error.message 
          : 'Failed to generate video. Please try again.' 
      });
    } finally {
      updateState({ isLoading: false });
    }
  };

  const canGenerate = state.image && 
    ((state.inputType === 'text' && state.textInput.trim()) || 
     (state.inputType === 'audio' && state.audioFile));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SpeakPortrait
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your photos into captivating speaking portraits with the power of AI. 
            Upload an image and add your voice or text to create amazing talking videos.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-indigo-100/50">
            {state.isLoading ? (
              <LoadingSpinner />
            ) : state.generatedVideo ? (
              <VideoOutput 
                videoUrl={state.generatedVideo} 
                onReset={() => updateState({ generatedVideo: null })}
              />
            ) : (
              <div className="space-y-8">
                {/* Image Upload Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">1</span>
                    </div>
                    Upload Your Portrait
                  </h2>
                  <ImageUpload 
                    image={state.image}
                    onImageSelect={(file) => updateState({ image: file, error: null })}
                  />
                </div>

                {/* Input Selection */}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">2</span>
                    </div>
                    Choose Your Input
                  </h2>
                  <InputSelector 
                    inputType={state.inputType}
                    textInput={state.textInput}
                    audioFile={state.audioFile}
                    onInputTypeChange={(type) => updateState({ inputType: type, error: null })}
                    onTextChange={(text) => updateState({ textInput: text, error: null })}
                    onAudioSelect={(file) => updateState({ audioFile: file, error: null })}
                  />
                </div>

                {/* Error Display */}
                {state.error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-red-700 text-sm font-medium">{state.error}</p>
                  </div>
                )}

                {/* Generate Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Speaking Portrait
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
        </div>
      </div>
    </div>
  );
}