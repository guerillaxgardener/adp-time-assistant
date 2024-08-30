import React, { useState, useEffect } from 'react';
import MessageComponent from './components/MessageComponent';
import Modal from './components/Modal';
import Footer from './components/Footer';
import ModalContent from './components/ModalContent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { calculateTotalWorkedMinutes, calculateRemainingTime, calculateDailyTime } from './timeUtils';

const App: React.FC = () => {
  const [hours, setHours] = useState<{ Mon: string; Tues: string; Wed: string; Thur: string; Fri: string }>(() => {
    const savedHours = localStorage.getItem('hours');
    return savedHours ? JSON.parse(savedHours) : { Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' };
  });

  const [remainingTime, setRemainingTime] = useState({ remaining: true, hours: 40, minutes: 0, overtimeHours: 0, overtimeMins: 0 });

  useEffect(() => {
    localStorage.setItem('hours', JSON.stringify(hours));

    const totalWorkedMinutes = calculateTotalWorkedMinutes(hours);
    const newRemainingTime = calculateRemainingTime(totalWorkedMinutes);

    setRemainingTime(newRemainingTime);
  }, [hours]);

  const handleInputChange = (day: keyof typeof hours, value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setHours((prev) => ({ ...prev, [day]: value }));
    }
  };

  const handleReset = () => {
    localStorage.removeItem('hours');
    setHours({ Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' });
  };

  // Manage multiple modals
  const [modalsOpen, setModalsOpen] = useState({ modal1: false, modal2: false });

  const openModal = (modalKey: keyof typeof modalsOpen) => setModalsOpen((prev) => ({ ...prev, [modalKey]: true }));
  const closeModal = (modalKey: keyof typeof modalsOpen) => setModalsOpen((prev) => ({ ...prev, [modalKey]: false }));

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full p-4 bg-blue-500 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ADP-Mimic</h1>
          <button
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
            {(['Mon', 'Tues', 'Wed', 'Thur', 'Fri'] as const).map((day) => {
              const { remaining, remainingHours, remainingMins, overtimeHours, overtimeMins } = calculateDailyTime(hours[day]);

              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="flex items-center w-full">
                    <label className="w-16 text-gray-700">{day}:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9]*[.,]?[0-9]+" 
                      value={hours[day]}
                      onChange={(e) => handleInputChange(day, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      className="w-full p-2 border rounded text-gray-700"
                      placeholder="Enter hours"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1 ml-6 mx-12 text-start">
                    {remaining
                      ? `You have ${remainingHours} hours and ${remainingMins} minutes remaining to work to reach 8 hours.`
                      : `You have 0 hours remaining. You've completed ${overtimeHours} hours and ${overtimeMins} minutes of overtime!`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 ">
            <p className="text-xl text-gray-700 ">
              {remainingTime.remaining
                ? `Hours Remaining for 40: ${remainingTime.hours} hrs ${remainingTime.minutes} mins`
                : `Weekly Overtime: ${remainingTime.overtimeHours} hrs ${remainingTime.overtimeMins} mins`}
            </p>
            <MessageComponent remainingTime={remainingTime} />
          </div>

          {/* First Modal */}
          <Modal isOpen={modalsOpen.modal1} onClose={() => closeModal('modal1')}>
            <ModalContent modalType="modal1" />
          </Modal>

          {/* Second Modal */}
          <Modal isOpen={modalsOpen.modal2} onClose={() => closeModal('modal2')}>
            <ModalContent modalType="modal2" />
          </Modal>
        </div>
      </main>
      <Footer openModal1={() => openModal('modal1')} openModal2={() => openModal('modal2')} />
    </div>
  );
};

export default App;
