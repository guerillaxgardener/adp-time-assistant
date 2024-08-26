import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [hours, setHours] = useState<{ Mon: number; Tues: number; Wed: number; Thur: number; Fri: number }>(() => {
    // Retrieve initial values from local storage or set to 0
    const savedHours = localStorage.getItem('hours');
    return savedHours ? JSON.parse(savedHours) : { Mon: 0, Tues: 0, Wed: 0, Thur: 0, Fri: 0 };
  });

  const [remainingTime, setRemainingTime] = useState({ hours: 40, minutes: 0 });

  useEffect(() => {
    // Save hours to local storage whenever they change
    localStorage.setItem('hours', JSON.stringify(hours));

    const totalWorked = Object.values(hours).reduce((total, h) => total + h, 0);
    const totalMinutes = Math.floor(totalWorked * 60);
    const remainingMinutes = Math.max(2400 - totalMinutes, 0); // 2400 minutes = 40 hours

    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;

    setRemainingTime({ hours: remainingHours, minutes: remainingMins });
  }, [hours]);

  const handleInputChange = (day: keyof typeof hours, value: string) => {
    const decimalValue = parseFloat(value);
    if (!isNaN(decimalValue)) {
      setHours((prev) => ({ ...prev, [day]: decimalValue }));
    }
  };

  const handleReset = () => {
    localStorage.removeItem('hours');
    setHours({ Mon: 0, Tues: 0, Wed: 0, Thur: 0, Fri: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full p-4 bg-blue-500 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">K's ADP Improver</h1>          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </header>
      <main className="w-full flex-grow flex flex-col items-center justify-start max-w-6xl mx-auto px-4 py-8">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-4">
            Enter Hours Worked
          </h2>
          <div className="flex flex-col space-y-4">
            {(['Mon', 'Tues', 'Wed', 'Thur', 'Fri'] as const).map((day) => (
              <div key={day} className="flex items-center">
                <label className="w-16 text-gray-700">{day}:</label>
                <input
                  type="number"
                  step="0.1"
                  value={hours[day]}
                  onChange={(e) => handleInputChange(day, e.target.value)}
                  onFocus={(e) => e.target.select()} // Highlights all value on click
                  className="w-full p-2 border rounded text-gray-700"
                  placeholder="Enter hours"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-700">
              Hours Remaining: {remainingTime.hours} hrs {remainingTime.minutes} mins
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
