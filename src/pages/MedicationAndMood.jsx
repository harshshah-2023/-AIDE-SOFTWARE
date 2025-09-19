import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { 
  FiPlus, FiCheck, FiClock, 
  FiCalendar, FiTrendingUp, 
  FiActivity, FiSmile, FiBell,
  FiX, FiEdit3, FiPieChart,
  FiHeart, FiTarget, FiTrendingDown
} from "react-icons/fi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MedicationAndMood = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: "Donepezil", time: "08:00", dosage: "5mg", taken: true },
    { id: 2, name: "Memantine", time: "14:00", dosage: "10mg", taken: false },
    { id: 3, name: "Vitamin D", time: "20:00", dosage: "1000IU", taken: false },
  ]);

  const [moodLogs, setMoodLogs] = useState([
    { date: "2025-01-14", mood: "😊", notes: "Felt energetic today" },
    { date: "2025-01-15", mood: "😐", notes: "Average day" },
    { date: "2025-01-16", mood: "😔", notes: "Not feeling my best" },
    { date: "2025-01-17", mood: "😊", notes: "Great morning walk" },
    { date: "2025-01-18", mood: "😐", notes: "Busy day" },
  ]);

  const [newMed, setNewMed] = useState({ name: "", time: "", dosage: "" });
  const [showMedForm, setShowMedForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newMoodNote, setNewMoodNote] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Generate notifications for upcoming medications
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const upcomingMeds = medications.filter(med => {
      const [medHour, medMinute] = med.time.split(':').map(Number);
      return !med.taken && 
             ((medHour === currentHour && medMinute >= currentMinute) || 
              (medHour === currentHour + 1 && medMinute <= currentMinute));
    });
    
    setNotifications(upcomingMeds.map(med => ({
      id: med.id,
      message: `${med.name} due at ${formatTime(med.time)}`,
      type: "medication"
    })));
  }, [medications]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour}:${minutes} ${ampm}`;
  };

  const toggleTaken = (id) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const addMedication = (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.time) return;
    setMedications((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        name: newMed.name, 
        time: newMed.time, 
        dosage: newMed.dosage || "1 dose",
        taken: false 
      },
    ]);
    setNewMed({ name: "", time: "", dosage: "" });
    setShowMedForm(false);
  };

  const addMood = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    setMoodLogs([...moodLogs, { date: today, mood, notes: newMoodNote }]);
    setNewMoodNote("");
  };

  // Mood scoring for chart
  const moodToScore = { "😊": 5, "😐": 3, "😔": 1 };
  const chartData = {
    labels: moodLogs.slice(-7).map((log) => new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: "Mood Trend",
        data: moodLogs.slice(-7).map((log) => moodToScore[log.mood]),
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: moodLogs.slice(-7).map(log => 
          log.mood === "😊" ? "#10b981" : 
          log.mood === "😐" ? "#f59e0b" : "#ef4444"
        ),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
      },
    ],
  };

  // Adherence chart data
  const takenMeds = medications.filter((m) => m.taken).length;
  const missedMeds = medications.length - takenMeds;
  const adherenceData = {
    labels: ['Taken', 'Missed'],
    datasets: [
      {
        data: [takenMeds, missedMeds],
        backgroundColor: ['#10b981', '#ef4444'],
        hoverBackgroundColor: ['#059669', '#dc2626'],
        borderWidth: 0,
      },
    ],
  };

  const adherenceRate =
    medications.length > 0
      ? Math.round((takenMeds / medications.length) * 100)
      : 0;

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 6,
        ticks: {
          callback: function(value) {
            if (value === 5) return "Excellent";
            if (value === 4) return "Good";
            if (value === 3) return "Neutral";
            if (value === 2) return "Low";
            if (value === 1) return "Poor";
            return "";
          },
          color: '#9ca3af',
          font: { size: 12 }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(75, 85, 99, 0.2)',
        },
      },
      x: {
        ticks: {
          color: '#9ca3af',
          font: { size: 12 }
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#d1d5db',
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 12,
      },
    },
  };

  const currentMood = moodLogs.length > 0 ? moodLogs[moodLogs.length - 1].mood : "😐";
  const moodStreak = moodLogs.slice(-7).filter(log => log.mood === "😊").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(6, 182, 212, 0.15) 2px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                <FiHeart className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Health Dashboard
                </h1>
                <p className="text-gray-300 mt-2 text-lg">Welcome back, Emily Chen</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <FiBell className="text-xl text-gray-300 hover:text-white transition-colors cursor-pointer" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </div>
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-2xl flex items-center shadow-lg">
                <FiCalendar className="mr-3 text-lg" />
                <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-4 rounded-2xl border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">{adherenceRate}%</p>
                  <p className="text-gray-300 text-sm">Adherence</p>
                </div>
                <FiTarget className="text-2xl text-emerald-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-2xl border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-400">{medications.filter(m => m.taken).length}/{medications.length}</p>
                  <p className="text-gray-300 text-sm">Today's Meds</p>
                </div>
                <FiCheck className="text-2xl text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-2xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-400">{currentMood}</p>
                  <p className="text-gray-300 text-sm">Current Mood</p>
                </div>
                <FiSmile className="text-2xl text-purple-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-2xl border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{moodStreak}</p>
                  <p className="text-gray-300 text-sm">Good Days</p>
                </div>
                <FiTrendingUp className="text-2xl text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Notifications */}
        {notifications.length > 0 && (
          <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-xl border border-amber-500/50 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-semibold text-amber-300 mb-4 flex items-center text-xl">
              <div className="p-2 bg-amber-500 rounded-xl mr-3">
                <FiBell className="text-lg text-white" />
              </div>
              Medication Reminders
            </h3>
            <div className="grid gap-3">
              {notifications.map(notif => (
                <div key={notif.id} className="bg-amber-800/30 border border-amber-600/30 rounded-2xl p-4 flex items-center">
                  <span className="text-2xl mr-4">⏰</span>
                  <span className="text-amber-100 font-medium">{notif.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Medication Section */}
          <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mr-4">
                  <FiActivity className="text-xl text-white" />
                </div>
                Medication Schedule
              </h2>
              <button 
                onClick={() => setShowMedForm(!showMedForm)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-2xl flex items-center hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg transform hover:scale-105 font-medium"
              >
                <FiPlus className="mr-2" /> Add Medication
              </button>
            </div>

            {/* Enhanced Add New Med Form */}
            {showMedForm && (
              <form onSubmit={addMedication} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-3xl border border-blue-500/30 backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Medication Name"
                  className="bg-gray-800/80 border border-gray-600 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="bg-gray-800/80 border border-gray-600 rounded-2xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newMed.time}
                  onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Dosage (optional)"
                    className="flex-1 bg-gray-800/80 border border-gray-600 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 rounded-2xl hover:from-blue-700 hover:to-cyan-700 flex items-center transform hover:scale-105 transition-all shadow-lg"
                  >
                    <FiPlus className="text-xl" />
                  </button>
                </div>
              </form>
            )}

            {/* Enhanced Medication List */}
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className={`flex justify-between items-center p-6 rounded-3xl border-2 transition-all transform hover:scale-[1.02] ${
                    med.taken
                      ? "border-emerald-500/50 bg-gradient-to-r from-emerald-900/30 to-green-900/30 shadow-emerald-500/20 shadow-lg"
                      : "border-gray-600/50 bg-gradient-to-r from-gray-800/40 to-slate-800/40 shadow-lg"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-4 rounded-2xl mr-4 ${
                      med.taken 
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-500/50 shadow-lg" 
                        : "bg-gradient-to-r from-gray-600 to-slate-600"
                    }`}>
                      <FiActivity className="text-xl text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white mb-2">
                        {med.name}
                      </p>
                      <div className="flex items-center text-gray-300">
                        <FiClock className="mr-2" />
                        <span className="font-medium">{formatTime(med.time)}</span>
                        <span className="mx-4 text-gray-600">•</span>
                        <span className="bg-gray-700/60 px-3 py-1 rounded-xl text-sm font-medium">
                          {med.dosage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTaken(med.id)}
                    className={`px-6 py-3 rounded-2xl font-semibold flex items-center transition-all transform hover:scale-105 ${
                      med.taken
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 shadow-lg"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                    }`}
                  >
                    {med.taken ? (
                      <>
                        <FiCheck className="mr-2" /> Taken
                      </>
                    ) : (
                      "Mark as Taken"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Mood Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-4">
                <FiSmile className="text-xl text-white" />
              </div>
              Mood Tracker
            </h2>

            {/* Enhanced Mood Buttons */}
            <div className="flex justify-center gap-6 mb-8">
              <button
                onClick={() => addMood("😊")}
                className="text-4xl hover:scale-125 transition-all bg-gradient-to-r from-emerald-800/60 to-green-800/60 p-4 rounded-3xl hover:from-emerald-700/70 hover:to-green-700/70 border border-emerald-600/30 shadow-xl transform hover:rotate-12"
                title="Great mood"
              >
                😊
              </button>
              <button
                onClick={() => addMood("😐")}
                className="text-4xl hover:scale-125 transition-all bg-gradient-to-r from-amber-800/60 to-yellow-800/60 p-4 rounded-3xl hover:from-amber-700/70 hover:to-yellow-700/70 border border-amber-600/30 shadow-xl transform hover:rotate-12"
                title="Neutral mood"
              >
                😐
              </button>
              <button
                onClick={() => addMood("😔")}
                className="text-4xl hover:scale-125 transition-all bg-gradient-to-r from-red-800/60 to-rose-800/60 p-4 rounded-3xl hover:from-red-700/70 hover:to-rose-700/70 border border-red-600/30 shadow-xl transform hover:rotate-12"
                title="Low mood"
              >
                😔
              </button>
            </div>

            {/* Enhanced Mood note input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-200 mb-3">
                Add a note about your mood (optional)
              </label>
              <input
                type="text"
                placeholder="How are you feeling today?"
                className="w-full bg-gray-800/80 border border-gray-600 rounded-2xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={newMoodNote}
                onChange={(e) => setNewMoodNote(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMoodNote) {
                    addMood("😐");
                  }
                }}
              />
            </div>

            {/* Enhanced Chart */}
            <div className="bg-gradient-to-r from-gray-800/40 to-slate-800/40 p-6 rounded-3xl mb-8 border border-gray-700/30 h-64">
              <h3 className="font-semibold text-gray-100 mb-4 flex items-center text-lg">
                <FiTrendingUp className="mr-3 text-xl" /> 7-Day Mood Trend
              </h3>
              <div className="h-44">
                <Line data={chartData} options={lineChartOptions} />
              </div>
            </div>

            {/* Enhanced Mood Logs */}
            <div>
              <h3 className="font-semibold text-gray-100 mb-4 text-lg">Recent Entries</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {moodLogs.slice().reverse().slice(0, 5).map((log, i) => (
                  <div key={i} className="p-4 bg-gradient-to-r from-gray-800/40 to-slate-800/40 rounded-2xl flex items-center border border-gray-700/30 hover:border-gray-600/50 transition-all">
                    <span className="text-3xl mr-4">{log.mood}</span>
                    <div className="flex-1">
                      <p className="text-gray-100 font-medium">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      {log.notes && <p className="text-gray-300 text-sm mt-1">{log.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enhanced Adherence Summary */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FiPieChart className="mr-3 text-xl" />
              Adherence Overview
            </h2>
            <div className="flex items-center justify-center h-32 mb-6">
              <Doughnut data={adherenceData} options={doughnutOptions} />
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">{adherenceRate}%</p>
              <p className="text-gray-300">Adherence Rate</p>
              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl border border-emerald-600/30">
                <p className="text-emerald-300 text-sm font-medium">
                  {adherenceRate >= 80 ? "Excellent adherence!" : adherenceRate >= 60 ? "Good progress" : "Needs improvement"}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Summary */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-700/30">
                <div>
                  <p className="text-3xl font-bold text-blue-300">{medications.filter(m => m.taken).length}</p>
                  <p className="text-gray-300 text-sm">Medications Taken</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <FiCheck className="text-xl text-white" />
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/30">
                <div>
                  <p className="text-3xl font-bold text-purple-300">{moodLogs.length}</p>
                  <p className="text-gray-300 text-sm">Mood Entries</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg">
                  <FiSmile className="text-xl text-white" />
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-700/30">
                <div>
                  <p className="text-3xl font-bold text-emerald-300">{moodStreak}</p>
                  <p className="text-gray-300 text-sm">Good Mood Streak</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg">
                  <FiTrendingUp className="text-xl text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => setShowMedForm(!showMedForm)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-600/50 bg-gradient-to-r from-blue-800/40 to-cyan-800/40 hover:from-blue-700/50 hover:to-cyan-700/50 transition-all transform hover:scale-105 text-white shadow-lg group"
              >
                <span className="font-medium">Add Medication</span>
                <FiPlus className="text-gray-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-600/50 bg-gradient-to-r from-purple-800/40 to-pink-800/40 hover:from-purple-700/50 hover:to-pink-700/50 transition-all transform hover:scale-105 text-white shadow-lg group">
                <span className="font-medium">Quick Mood Log</span>
                <FiSmile className="text-gray-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-600/50 bg-gradient-to-r from-emerald-800/40 to-green-800/40 hover:from-emerald-700/50 hover:to-green-700/50 transition-all transform hover:scale-105 text-white shadow-lg group">
                <span className="font-medium">View History</span>
                <FiCalendar className="text-gray-300 group-hover:text-white transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-600/50 bg-gradient-to-r from-amber-800/40 to-orange-800/40 hover:from-amber-700/50 hover:to-orange-700/50 transition-all transform hover:scale-105 text-white shadow-lg group">
                <span className="font-medium">Set Reminder</span>
                <FiBell className="text-gray-300 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationAndMood;