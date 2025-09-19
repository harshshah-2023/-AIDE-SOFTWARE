import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ patientName, status = 'Normal' }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'warning': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'alert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': return '●';
      case 'warning': return '⚠';
      case 'alert': return '⚡';
      default: return '●';
    }
  };

  // Fixed SVG data URI with proper encoding
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-2xl">
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <div className="relative z-10 flex justify-between items-center p-8">
        <div className="flex items-center space-x-6">
          {/* Logo/Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              AIDE Caregiver Dashboard
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-slate-400 text-lg">Monitoring:</span>
              <span className="text-xl font-semibold text-white bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/50">
                {patientName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Status indicator */}
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${getStatusColor(status)}`}>
            <span className="text-lg animate-pulse" aria-hidden="true">{getStatusIcon(status)}</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-75">System Status</span>
              <span className="text-sm font-bold">{status}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button 
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-400/20"
              aria-label="Call patient"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Patient</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <button 
              className="group relative p-3 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 backdrop-blur-sm"
              aria-label="Open settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </header>
  );
};

Header.propTypes = {
  patientName: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Normal', 'Warning', 'Alert', 'normal', 'warning', 'alert'])
};

Header.defaultProps = {
  status: 'Normal'
};

export default Header;