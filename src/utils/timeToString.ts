const formatTime = (n: number) => `${n}`.padStart(2, "0");

export const formatElapsedTimeMS = (elapsedTime: number) => {
  const date = new Date(elapsedTime);
  const [ms, ss, mm] = [
    Math.floor(date.getMilliseconds() / 10),
    date.getSeconds(),
    date.getMinutes(),
  ];

  return `${formatTime(mm)}:${formatTime(ss)}:${formatTime(ms)}`;
};

export const formatElapsedTime = (elapsedTime: number) => {
  const date = new Date(elapsedTime);
  const [ss, mm] = [date.getSeconds(), date.getMinutes()];

  return `${formatTime(mm)}:${formatTime(ss)}`;
};
