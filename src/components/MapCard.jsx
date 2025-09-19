import React from 'react';

const MapCard = ({ location }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-96 overflow-hidden border border-gray-700 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Live Location & Safety
          </h2>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/30">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          Within Safe Zone
        </span>
      </div>

      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-dashed border-slate-600 rounded-2xl h-full flex items-center justify-center overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Outer safe zone ring */}
        <div className="absolute w-72 h-72 rounded-full border-2 border-emerald-400/40 border-dashed opacity-60" style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
            25% { transform: translate(-50%, -50%) translate(8px, -5px); }
            50% { transform: translate(-50%, -50%) translate(-5px, -8px); }
            75% { transform: translate(-50%, -50%) translate(-8px, 5px); }
          }
        `}</style>

        {/* Inner safe zone ring */}
        <div className="absolute w-56 h-56 rounded-full border border-emerald-500/30 opacity-40" style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}></div>

        {/* Location marker with enhanced effects */}
        <div className="absolute" style={{ top: '47%', left: '52%' }}>
          {/* Outer pulse ring */}
          <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40" style={{ animationDuration: '2s' }}></div>
          {/* Middle pulse ring */}
          <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 top-1 left-1" style={{ animationDuration: '1.5s' }}></div>
          {/* Core marker */}
          <div className="relative inline-flex rounded-full h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50 border-2 border-white/20"></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
        </div>

        {/* Enhanced info card */}
        <div className="text-center z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-600/50 max-w-xs">
          <div className="flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm font-semibold text-white">📍 Current Location</p>
          </div>
          <p className="text-lg font-medium text-gray-200 mb-2">{location.address}</p>
          <div className="flex items-center justify-center text-xs text-gray-400">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span>Last updated: 2 mins ago</span>
          </div>
          {/* Status indicators */}
          <div className="flex justify-center space-x-4 mt-3 pt-3 border-t border-gray-600/50">
            <div className="flex items-center text-xs text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
              GPS Active
            </div>
            <div className="flex items-center text-xs text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
              Signal Strong
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced action buttons */}
      <div className="flex justify-between mt-4 text-sm space-x-4">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-600/25 border border-blue-500/30">
          <span className="flex items-center justify-center">
            <span className="mr-2">📊</span>
            View History
          </span>
        </button>
        <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-gray-700/25 border border-gray-600/30">
          <span className="flex items-center justify-center">
            <span className="mr-2">⚙️</span>
            Configure Zones
          </span>
        </button>
      </div>
    </div>
  );
};

export default MapCard;