import React from 'react';

const InsightsCard = () => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-3"></div>
          Care Intelligence
        </h2>
        <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300 font-medium">Live Analytics</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-200 text-lg">Weekly Sleep Quality</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-400">Excellent</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-40 bg-gray-900/30 rounded-lg p-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const height = [30, 45, 20, 60, 40, 25, 55][i];
              const getBarColor = (h) => {
                if (h < 30) return 'from-red-500 to-red-600';
                if (h < 50) return 'from-yellow-400 to-orange-500';
                return 'from-green-400 to-emerald-500';
              };
              return (
                <div key={day} className="flex flex-col items-center group cursor-pointer">
                  <div className="text-xs text-gray-400 mb-2 group-hover:text-white transition-colors">{day}</div>
                  <div
                    className={`w-8 rounded-lg bg-gradient-to-t ${getBarColor(height)} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="font-semibold text-gray-200 text-lg mb-4">Agitation Events</h3>
          <div className="space-y-4">
            <div className="bg-gray-900/40 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Sundowning (Evening)</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30">
                    HIGH
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full shadow-inner" style={{width: '75%'}}></div>
              </div>
            </div>
            
            <div className="bg-gray-900/40 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">After Meals</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/30">
                    MEDIUM
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-inner" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <span className="font-semibold">📊 Insight:</span> Peak agitation occurs between 5-7 PM daily.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-purple-200 mb-1">AI-Powered Recommendation</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Implement a structured calming routine 30 minutes before peak agitation time. 
                Consider gentle music, aromatherapy, or light physical activity around 4:30 PM.
              </p>
              <div className="flex items-center mt-3 space-x-4">
                <span className="text-xs text-gray-400">Confidence: 94%</span>
                <span className="text-xs text-green-400">✓ Evidence-based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsCard;