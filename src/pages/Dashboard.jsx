import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import VitalsCard from '../components/VitalsCard';
import MapCard from '../components/MapCard';
import GuidanceSimulator from '../components/GuidanceSimulator';
import InsightsCard from '../components/InsightsCard';
// import MedicationAndMood from '../components/MedicationAndMood';

const Dashboard = () => {
  const [patientData, setPatientData] = useState({
    name: 'Emily Chen',
    status: 'Normal',
    vitals: { heartRate: 72, spO2: 98, temperature: 36.6, battery: 85 },
    location: { lat: 28.6129, lng: 77.2295, address: 'Home - Living Room' },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPatientData(prevData => ({
        ...prevData,
        vitals: { ...prevData.vitals, heartRate: Math.floor(Math.random() * 10) + 70, }
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_70%)] pointer-events-none"></div>
      
      <Header patientName={patientData.name} status={patientData.status} />
      
      <main className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        
        {/* Left Column - Core Monitoring */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <VitalsCard vitals={patientData.vitals} />
          <MapCard location={patientData.location} />
          <InsightsCard /> {/* New Intelligence Component */}
        </div>

        {/* Right Column - Alerts & Interaction */}
        <div className="space-y-4 sm:space-y-6">
          <GuidanceSimulator /> {/* Your Killer Feature Demo */}
          
          {/* Alerts Card (Updated with Dark Mode) */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 p-6 hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 animate-pulse"></div>
                Alerts & Notifications
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Critical Alert */}
              <div className="relative overflow-hidden flex items-start p-4 bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg backdrop-blur-sm group hover:border-red-400/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                    <p className="font-semibold text-red-300">Fall Detected!</p>
                    <span className="ml-auto text-xs text-red-400/70">10:42 AM</span>
                  </div>
                  <p className="text-sm text-red-200/80">High-impact fall detected in the kitchen. Emergency response initiated.</p>
                </div>
                <div className="flex h-3 w-3 ml-3 relative z-10">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="relative overflow-hidden flex items-start p-4 bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 border border-yellow-500/30 rounded-lg backdrop-blur-sm group hover:border-yellow-400/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                    <p className="font-semibold text-yellow-300">Missed Medication</p>
                    <span className="ml-auto text-xs text-yellow-400/70">2:30 PM</span>
                  </div>
                  <p className="text-sm text-yellow-200/80">Afternoon dose of Donepezil was not taken. Reminder sent.</p>
                </div>
              </div>

              {/* Success Alert */}
              <div className="relative overflow-hidden flex items-start p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg backdrop-blur-sm group hover:border-blue-400/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <p className="font-semibold text-blue-300">Guidance Completed</p>
                    <span className="ml-auto text-xs text-blue-400/70">1:15 PM</span>
                  </div>
                  <p className="text-sm text-blue-200/80">Patient successfully completed the handwashing sequence with AI assistance.</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-3 relative z-10"></div>
              </div>

              {/* Info Alert */}
              <div className="relative overflow-hidden flex items-start p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-lg backdrop-blur-sm group hover:border-purple-400/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <p className="font-semibold text-purple-300">Daily Summary</p>
                    <span className="ml-auto text-xs text-purple-400/70">12:00 PM</span>
                  </div>
                  <p className="text-sm text-purple-200/80">Today's wellness score: 87%. Activity levels are within normal range.</p>
                </div>
              </div>
            </div>

            {/* Alert Statistics */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Today's Alerts</span>
                <div className="flex items-center space-x-4">
                  <span className="text-red-400">1 Critical</span>
                  <span className="text-yellow-400">1 Warning</span>
                  <span className="text-green-400">2 Resolved</span>
                </div>
              </div>
            </div>
          </div>
          

        </div>
     
      </main>
         {/* <MedicationAndMood/> */}
    </div>
  );
};

export default Dashboard;