const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getUtcDateOnly = (date: Date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

export const calculateRestDays = (
  registrationDate: string,
  totalSessions: number,
  currentDate = new Date(),
) => {
  const registeredAt = new Date(registrationDate);
  const daysSinceRegistration = Math.floor(
    (getUtcDateOnly(currentDate) - getUtcDateOnly(registeredAt)) / MS_PER_DAY,
  );

  return Math.max(0, daysSinceRegistration - totalSessions);
};
