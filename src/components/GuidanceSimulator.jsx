import React, { useState } from 'react';
import { guidanceSequence } from '../data/mockData';

const GuidanceSimulator = () => {
  const [isGuiding, setIsGuiding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startGuidance = () => {
    setIsGuiding(true);
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep((step) => {
        if (step >= guidanceSequence.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsGuiding(false), 3000);
          return step;
        }
        return step + 1;
      });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
        Step-by-Step Guidance
      </h2>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl text-center mb-6 border border-gray-600 shadow-inner">
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl mx-auto max-w-sm shadow-2xl border border-gray-700">
          {isGuiding ? (
            <div className="text-white text-center p-6">
              <div className="text-6xl mb-4 animate-pulse">
                {guidanceSequence[currentStep].icon}
              </div>
              <p className="text-xl font-semibold text-gray-100 leading-relaxed">
                {guidanceSequence[currentStep].text}
              </p>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white text-center p-6">
              <div className="text-5xl mb-4 text-blue-400">🤖</div>
              <p className="text-xl font-medium text-gray-300">AIDE is ready to help.</p>
              <p className="text-sm text-gray-500 mt-2">Click below to start demonstration</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-gray-300 text-base leading-relaxed">
            This is what the patient sees and hears. Demonstrates 
            <span className="text-blue-400 font-semibold"> "Hand Washing"</span> sequence.
          </p>
        </div>
        <button
          onClick={startGuidance}
          disabled={isGuiding}
          className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
            isGuiding 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {isGuiding ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Guiding...
            </span>
          ) : (
            'Start Demonstration'
          )}
        </button>
      </div>

      {isGuiding && (
        <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-3000 ease-out shadow-lg"
              style={{ width: `${((currentStep + 1) / guidanceSequence.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-400">
              Step {currentStep + 1} of {guidanceSequence.length}
            </p>
            <p className="text-sm text-gray-400">
              {Math.round(((currentStep + 1) / guidanceSequence.length) * 100)}% Complete
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidanceSimulator;