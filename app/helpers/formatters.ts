export const formatMemberDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const formatDistance = (distance: string | number) =>
  new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
  }).format(Number(distance));

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}min`;
};

export const getDurationParts = (minutes: number) => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("fr-FR").format(value);

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
