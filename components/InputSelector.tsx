'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Type, Mic, Upload, X, Volume2 } from 'lucide-react';

interface InputSelectorProps {
  inputType: 'text' | 'audio';
  textInput: string;
  audioFile: File | null;
  onInputTypeChange: (type: 'text' | 'audio') => void;
  onTextChange: (text: string) => void;
  onAudioSelect: (file: File) => void;
}

export default function InputSelector({
  inputType,
  textInput,
  audioFile,
  onInputTypeChange,
  onTextChange,
  onAudioSelect,
}: InputSelectorProps) {
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const handleAudioFile = (file: File) => {
    onAudioSelect(file);
    
    // Create audio preview URL
    const url = URL.createObjectURL(file);
    setAudioPreview(url);
  };

  const handleAudioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleAudioFile(files[0]);
    }
  };

  const removeAudio = () => {
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
      setAudioPreview(null);
    }
    onAudioSelect(null as any);
  };

  return (
    <div className="space-y-6">
      {/* Input Type Selector */}
      <div className="flex gap-3">
        <Button
          variant={inputType === 'text' ? 'default' : 'outline'}
          onClick={() => onInputTypeChange('text')}
          className={`flex-1 h-12 transition-all duration-200 ${
            inputType === 'text' 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
              : 'hover:bg-indigo-50 hover:border-indigo-300'
          }`}
        >
          <Type className="mr-2 h-4 w-4" />
          Text Input
        </Button>
        <Button
          variant={inputType === 'audio' ? 'default' : 'outline'}
          onClick={() => onInputTypeChange('audio')}
          className={`flex-1 h-12 transition-all duration-200 ${
            inputType === 'audio' 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
              : 'hover:bg-indigo-50 hover:border-indigo-300'
          }`}
        >
          <Mic className="mr-2 h-4 w-4" />
          Audio Upload
        </Button>
      </div>

      {/* Text Input */}
      {inputType === 'text' && (
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-slate-800">Enter Your Text</h3>
            </div>
            <Textarea
              placeholder="Enter the text you want your portrait to speak. Be creative and expressive!"
              value={textInput}
              onChange={(e) => onTextChange(e.target.value)}
              className="min-h-32 resize-none border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 bg-white/80"
            />
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Write naturally - AI will handle the rest</span>
              <span>{textInput.length}/500</span>
            </div>
          </div>
        </Card>
      )}

      {/* Audio Input */}
      {inputType === 'audio' && (
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
          {audioFile && audioPreview ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Volume2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{audioFile.name}</p>
                    <p className="text-sm text-slate-500">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={removeAudio}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <audio
                controls
                src={audioPreview}
                className="w-full"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Mic className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">Upload Audio File</h3>
              </div>
              
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-slate-500 mb-4">
                  Upload an audio file with the speech you want your portrait to speak
                </p>
              </div>

              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioInput}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Audio File
                  </span>
                </Button>
              </label>
              
              <p className="text-xs text-slate-400 mt-4">
                Supports MP3, WAV, M4A • Max 25MB • Up to 60 seconds
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}