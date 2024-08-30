// Utility function to calculate total worked minutes
export const calculateTotalWorkedMinutes = (hours: { [key: string]: string }): number => {
  return Object.values(hours)
    .reduce((total, h) => total + (parseFloat(h) || 0), 0) * 60;
};

// Utility function to calculate remaining time or overtime for the week
export const calculateRemainingTime = (totalMinutes: number, targetMinutes: number = 2400) => {
  if (totalMinutes >= targetMinutes) {
    const overtimeMinutes = totalMinutes - targetMinutes;
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeMins = overtimeMinutes % 60;
    return {
      remaining: false,
      hours: 0,
      minutes: 0,
      overtimeHours,
      overtimeMins
    };
  } else {
    const remainingMinutes = targetMinutes - totalMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;
    return {
      remaining: true,
      hours: remainingHours,
      minutes: remainingMins,
      overtimeHours: 0,
      overtimeMins: 0
    };
  }
};

// Utility function to calculate time left or overtime for a single day
export const calculateDailyTime = (hours: string) => {
  const totalMinutes = (parseFloat(hours) || 0) * 60;
  const targetMinutes = 8 * 60; // 8 hours = 480 minutes

  if (totalMinutes >= targetMinutes) {
    const overtimeMinutes = totalMinutes - targetMinutes;
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeMins = overtimeMinutes % 60;
    return { remaining: false, overtimeHours, overtimeMins };
  } else {
    const remainingMinutes = targetMinutes - totalMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;
    return { remaining: true, remainingHours, remainingMins };
  }
};
