'use client';

import { Card } from '@/components/ui/card';
import { Sparkles, Wand2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <Card className="p-12 text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <div className="space-y-6">
        {/* Animated Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-spin">
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <Wand2 className="h-8 w-8 text-indigo-600 animate-pulse" />
            </div>
          </div>
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-purple-500 animate-bounce" />
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-slate-800">
            Creating Your Speaking Portrait
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Our AI is working its magic to bring your portrait to life. This usually takes 30-60 seconds.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-600">Processing your image...</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
            <span className="text-slate-600">Analyzing facial features...</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            <span className="text-slate-600">Generating speech animation...</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-300"></div>
            <span className="text-slate-600">Rendering final video...</span>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 p-4 bg-white/60 rounded-lg border border-indigo-100">
          <p className="text-xs text-slate-500 italic">
            💡 Did you know? Our AI analyzes over 100 facial landmarks to create realistic speech movements!
          </p>
        </div>
      </div>
    </Card>
  );
}