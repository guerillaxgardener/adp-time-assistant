import React, { useState, useEffect, useCallback } from "react";
import MessageComponent from "./components/MessageComponent";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import ModalContent from "./components/ModalContent";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  calculateTotalWorkedMinutes,
  calculateRemainingTime,
  calculateDailyTime,
} from "./timeUtils";

const App: React.FC = () => {
  const [hours, setHours] = useState<{
    Mon: string;
    Tues: string;
    Wed: string;
    Thur: string;
    Fri: string;
  }>(() => {
    const savedHours = localStorage.getItem("hours");
    return savedHours
      ? JSON.parse(savedHours)
      : { Mon: "", Tues: "", Wed: "", Thur: "", Fri: "" };
  });

  const [lastClockIn, setLastClockIn] = useState<{
    Mon: string;
    Tues: string;
    Wed: string;
    Thur: string;
    Fri: string;
  }>({
    Mon: "",
    Tues: "",
    Wed: "",
    Thur: "",
    Fri: "",
  });

  const [additionalMinutes, setAdditionalMinutes] = useState<{
    Mon: number;
    Tues: number;
    Wed: number;
    Thur: number;
    Fri: number;
  }>({
    Mon: 0,
    Tues: 0,
    Wed: 0,
    Thur: 0,
    Fri: 0,
  });

  const [dropdownOpen, setDropdownOpen] = useState<{
    [key in keyof typeof hours]: boolean;
  }>({
    Mon: false,
    Tues: false,
    Wed: false,
    Thur: false,
    Fri: false,
  });

  const [modalsOpen, setModalsOpen] = useState({
    modal1: false,
    modal2: false,
  });

  const openModal = (modalKey: keyof typeof modalsOpen) =>
    setModalsOpen((prev) => ({ ...prev, [modalKey]: true }));
  const closeModal = (modalKey: keyof typeof modalsOpen) =>
    setModalsOpen((prev) => ({ ...prev, [modalKey]: false }));

  const [remainingTime, setRemainingTime] = useState({
    remaining: true,
    hours: 40,
    minutes: 0,
    overtimeHours: 0,
    overtimeMins: 0,
  });

  useEffect(() => {
    localStorage.setItem("hours", JSON.stringify(hours));

    const totalWorkedMinutes = calculateTotalWorkedMinutes(
      hours,
      additionalMinutes
    );
    const newRemainingTime = calculateRemainingTime(totalWorkedMinutes);

    setRemainingTime(newRemainingTime);
  }, [hours, additionalMinutes]);

  const handleInputChange = (day: keyof typeof hours, value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setHours((prev) => ({ ...prev, [day]: value }));
    }
  };

  const handleReset = () => {
    localStorage.removeItem("hours");
    setHours({ Mon: "", Tues: "", Wed: "", Thur: "", Fri: "" });
    setLastClockIn({ Mon: "", Tues: "", Wed: "", Thur: "", Fri: "" });
    setAdditionalMinutes({ Mon: 0, Tues: 0, Wed: 0, Thur: 0, Fri: 0 });
  };
  
  
  const handleClockInChange = useCallback(
    (day: keyof typeof lastClockIn, value: string | null) => {
      if (value) {
        setLastClockIn((prev) => ({ ...prev, [day]: value }));

        const now = new Date();
        const [hour, minute] = value.split(":").map(Number);
        const clockInTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute
        );

        const minutesWorked = Math.max(
          0,
          Math.ceil((now.getTime() - clockInTime.getTime()) / 60000)
        );
        setAdditionalMinutes((prev) => ({ ...prev, [day]: minutesWorked }));
      }
    },
    [lastClockIn]
  );

  useEffect(() => {
    localStorage.setItem("hours", JSON.stringify(hours));

    const totalWorkedMinutes = calculateTotalWorkedMinutes(
      hours,
      additionalMinutes
    );
    const newRemainingTime = calculateRemainingTime(totalWorkedMinutes);

    setRemainingTime(newRemainingTime);
  }, [hours, additionalMinutes, handleClockInChange]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      Object.keys(lastClockIn).forEach((day) => {
        if (lastClockIn[day as keyof typeof lastClockIn]) {
          handleClockInChange(
            day as keyof typeof lastClockIn,
            lastClockIn[day as keyof typeof lastClockIn]
          );
        }
      });
    }, 60000); // Update every minute


    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [lastClockIn, handleClockInChange]);

  const handleBatchHours = (day: keyof typeof hours) => {
    const totalMinutes =
      (parseFloat(hours[day]) || 0) * 60 + additionalMinutes[day];
    const totalHours = (totalMinutes / 60).toFixed(2);

    setHours((prev) => ({ ...prev, [day]: totalHours }));
    setLastClockIn((prev) => ({ ...prev, [day]: "" }));
    setAdditionalMinutes((prev) => ({ ...prev, [day]: 0 }));
  };

  const toggleDropdown = (day: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimePickerClick = (day: keyof typeof lastClockIn) => {
    if (!lastClockIn[day]) {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      setLastClockIn((prev) => ({ ...prev, [day]: currentTime }));
    }
  };

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
            {(["Mon", "Tues", "Wed", "Thur", "Fri"] as const).map((day) => {
              const {
                remaining,
                remainingHours,
                remainingMins,
                overtimeHours,
                overtimeMins,
              } = calculateDailyTime(hours[day], additionalMinutes[day]);

              return (
                <div key={day} className="flex flex-col items-center w-full">
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
                  {(hours[day] === "" || parseFloat(hours[day]) < 8) && (
                    <div className="mt-2 w-full">
                      <button
                        onClick={() => toggleDropdown(day)}
                        className="text-xs text-blue-500 underline"
                      >
                        {dropdownOpen[day] ? "Hide" : "Add"} Last Clock-In
                      </button>
                      {dropdownOpen[day] && (
                        <div className="mt-2">
                          <label className="text-sm text-gray-600">
                            Last Clock-In Time:
                          </label>
                          <TimePicker
                            onChange={(value) =>
                              handleClockInChange(day, value)
                            }
                            value={lastClockIn[day]}
                            clockIcon={null}
                            clearIcon={null}
                            disableClock={true}
                            className="w-fit ml-6"
                            onClick={() => handleTimePickerClick(day)}
                          />
                          <p className="text-xs text-gray-600 mt-1">
                            {additionalMinutes[day] > 0
                              ? `Additional ${Math.floor(
                                  additionalMinutes[day] / 60
                                )} hours and ${
                                  additionalMinutes[day] % 60
                                } minutes worked since last clock-in.`
                              : "No additional time worked since last clock-in."}
                          </p>
                          <button
                            onClick={() => handleBatchHours(day)}
                            className="text-xs text-blue-500 underline mt-2"
                          >
                            Batch Hours
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-1 ml-6 mx-12 text-start">
                    {remaining
                      ? `You have ${remainingHours} hours and ${remainingMins} minutes remaining to work to reach 8 hours.`
                      : `You have 0 hours remaining. You've completed ${overtimeHours} hours and ${overtimeMins} minutes of overtime!`}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <p className="text-xl text-gray-700">
              {remainingTime.remaining
                ? `Hours Remaining for 40: ${remainingTime.hours} hrs ${remainingTime.minutes} mins`
                : `Weekly Overtime: ${remainingTime.overtimeHours} hrs ${remainingTime.overtimeMins} mins`}
            </p>
            <MessageComponent remainingTime={remainingTime} />
          </div>

          {/* First Modal */}
          <Modal
            isOpen={modalsOpen.modal1}
            onClose={() => closeModal("modal1")}
          >
            <ModalContent modalType="modal1" />
          </Modal>

          {/* Second Modal */}
          <Modal
            isOpen={modalsOpen.modal2}
            onClose={() => closeModal("modal2")}
          >
            <ModalContent modalType="modal2" />
          </Modal>
        </div>
      </main>
      <Footer
        openModal1={() => openModal("modal1")}
        openModal2={() => openModal("modal2")}
      />
    </div>
  );
};

export default App;
