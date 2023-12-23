export const calculateDuration = (time: number) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};

export const convertDecimalToPercantage = (value: number) => {
  return Math.round(value * 10);
};
