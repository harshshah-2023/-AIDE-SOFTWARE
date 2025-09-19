export const patientData = {
  name: 'Emily Chen',
  status: 'Normal',
  vitals: {
    heartRate: 72,
    spO2: 98,
    temperature: 36.6,
    battery: 85
  },
  location: {
    lat: 28.6129,
    lng: 77.2295,
    address: 'Home - Living Room'
  },
  activity: [
    { time: '10:15 AM', event: 'Took Morning Medication', type: 'success' },
    { time: '10:30 AM', event: 'Went for a walk', type: 'info' },
    { time: '11:45 AM', event: 'Heart rate elevated (120 bpm) for 5 mins', type: 'warning' },
  ]
};

export const guidanceSequence = [
  { text: "Let's wash our hands. First, turn on the water.", icon: "💧" },
  { text: "Now, put your hands under the water to wet them.", icon: "👐" },
  { text: "Great! Now, pick up the soap.", icon: "🧼" },
  { text: "Rub your hands together to make a lather.", icon: "🤲" },
  { text: "Rinse the soap off under the water.", icon: "💦" },
  { text: "Perfect! Now, turn off the water and dry your hands.", icon: "👍" },
];