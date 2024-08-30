// Utility function to calculate total worked minutes
export const calculateTotalWorkedMinutes = (
  hours: { [key: string]: string },
  additionalMinutes?: { [key: string]: number }
): number => {
  return Object.keys(hours).reduce((total, day) => {
    const minutesFromHours = (parseFloat(hours[day]) || 0) * 60;
    const additionalMins = additionalMinutes ? additionalMinutes[day] || 0 : 0;
    return total + minutesFromHours + additionalMins;
  }, 0);
};

// Utility function to calculate remaining time or overtime for the week
export const calculateRemainingTime = (
  totalMinutes: number,
  targetMinutes: number = 2400
) => {
  if (totalMinutes >= targetMinutes) {
    const overtimeMinutes = totalMinutes - targetMinutes;
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeMins = Math.ceil(overtimeMinutes % 60);
    return {
      remaining: false,
      hours: 0,
      minutes: 0,
      overtimeHours,
      overtimeMins,
    };
  } else {
    const remainingMinutes = targetMinutes - totalMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = Math.ceil(remainingMinutes % 60);
    return {
      remaining: true,
      hours: remainingHours,
      minutes: remainingMins,
      overtimeHours: 0,
      overtimeMins: 0,
    };
  }
};

// Utility function to calculate time left or overtime for a single day
export const calculateDailyTime = (
  hours: string,
  additionalMinutes: number = 0
) => {
  const totalMinutes = (parseFloat(hours) || 0) * 60 + additionalMinutes;
  const targetMinutes = 8 * 60; // 8 hours = 480 minutes

  if (totalMinutes >= targetMinutes) {
    const overtimeMinutes = totalMinutes - targetMinutes;
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeMins = Math.ceil(overtimeMinutes % 60);
    return { remaining: false, overtimeHours, overtimeMins };
  } else {
    const remainingMinutes = targetMinutes - totalMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = Math.ceil(remainingMinutes % 60);
    return { remaining: true, remainingHours, remainingMins };
  }
};
