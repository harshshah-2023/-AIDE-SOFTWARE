import React from 'react';

const VitalsCard = ({ vitals }) => {
  const { heartRate, spO2, temperature, battery } = vitals;

  // Status indicators with enhanced styling
  const getHeartRateStatus = (hr) => {
    if (hr > 100) return { color: 'text-red-400', bg: 'bg-gradient-to-br from-red-900/40 to-red-800/20', border: 'border-red-500/30', pulse: 'animate-pulse' };
    if (hr < 60) return { color: 'text-blue-400', bg: 'bg-gradient-to-br from-blue-900/40 to-blue-800/20', border: 'border-blue-500/30', pulse: '' };
    return { color: 'text-green-400', bg: 'bg-gradient-to-br from-green-900/40 to-green-800/20', border: 'border-green-500/30', pulse: '' };
  };

  const getSpO2Status = (spo2) => {
    if (spo2 < 95) return { color: 'text-yellow-400', bg: 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/20', border: 'border-yellow-500/30', pulse: 'animate-pulse' };
    return { color: 'text-green-400', bg: 'bg-gradient-to-br from-green-900/40 to-green-800/20', border: 'border-green-500/30', pulse: '' };
  };

  const getTempStatus = (temp) => {
    if (temp > 37.5) return { color: 'text-red-400', bg: 'bg-gradient-to-br from-red-900/40 to-red-800/20', border: 'border-red-500/30', pulse: 'animate-pulse' };
    if (temp < 36) return { color: 'text-blue-400', bg: 'bg-gradient-to-br from-blue-900/40 to-blue-800/20', border: 'border-blue-500/30', pulse: '' };
    return { color: 'text-emerald-400', bg: 'bg-gradient-to-br from-emerald-900/40 to-emerald-800/20', border: 'border-emerald-500/30', pulse: '' };
  };

  const getBatteryStatus = (batt) => {
    if (batt > 50) return { color: 'text-green-400', bgBar: 'bg-gradient-to-r from-green-500 to-green-400' };
    if (batt > 20) return { color: 'text-yellow-400', bgBar: 'bg-gradient-to-r from-yellow-500 to-yellow-400' };
    return { color: 'text-red-400', bgBar: 'bg-gradient-to-r from-red-500 to-red-400' };
  };

  const heartRateStyle = getHeartRateStatus(heartRate);
  const spO2Style = getSpO2Status(spO2);
  const tempStyle = getTempStatus(temperature);
  const batteryStyle = getBatteryStatus(battery);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
      {/* Header with animated pulse dot */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Live Vitals
          </h2>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Heart Rate */}
        <div className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${heartRateStyle.bg} ${heartRateStyle.border} ${heartRateStyle.pulse}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Heart Rate</p>
            <div className="text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-end">
            <span className={`text-4xl font-bold ${heartRateStyle.color} transition-colors duration-300`}>
              {heartRate}
            </span>
            <span className="text-sm text-gray-500 ml-2 mb-1">bpm</span>
          </div>
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${heartRateStyle.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000`} 
                 style={{ width: `${Math.min(heartRate / 2, 100)}%` }}></div>
          </div>
        </div>

        {/* SpO2 */}
        <div className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${spO2Style.bg} ${spO2Style.border} ${spO2Style.pulse}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Blood Oxygen</p>
            <div className="text-blue-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-end">
            <span className={`text-4xl font-bold ${spO2Style.color} transition-colors duration-300`}>
              {spO2}
            </span>
            <span className="text-sm text-gray-500 ml-2 mb-1">%</span>
          </div>
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${spO2Style.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000`} 
                 style={{ width: `${spO2}%` }}></div>
          </div>
        </div>

        {/* Temperature */}
        <div className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${tempStyle.bg} ${tempStyle.border} ${tempStyle.pulse}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Temperature</p>
            <div className="text-orange-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a3 3 0 00-3 3v6.5a4.5 4.5 0 109 0V5a3 3 0 00-3-3zm0 2a1 1 0 011 1v6.5a2.5 2.5 0 11-5 0V5a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-end">
            <span className={`text-4xl font-bold ${tempStyle.color} transition-colors duration-300`}>
              {temperature}
            </span>
            <span className="text-sm text-gray-500 ml-2 mb-1">°C</span>
          </div>
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${tempStyle.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000`} 
                 style={{ width: `${((temperature - 35) / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Device Battery */}
        <div className="group p-6 rounded-xl border-2 border-gray-600/50 bg-gradient-to-br from-gray-800/40 to-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Device Battery</p>
            <div className={`${batteryStyle.color}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2h1zm8-2v2H8V6a2 2 0 114 0z"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center mb-3">
            <span className={`text-4xl font-bold ${batteryStyle.color} transition-colors duration-300`}>
              {battery}
            </span>
            <span className="text-sm text-gray-500 ml-2">%</span>
          </div>
          
          {/* Enhanced Battery Bar */}
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${batteryStyle.bgBar} shadow-lg`}
                style={{ width: `${battery}%` }}>
                <div className="h-full w-full rounded-full bg-white/20"></div>
              </div>
            </div>
            {/* Battery percentage indicator */}
            <div className="absolute -top-6 right-0 text-xs text-gray-400 font-mono">
              {battery < 20 && '⚠️ Low'}
            </div>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last updated: just now</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsCard;