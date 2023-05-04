// helpers.js

export function getCurrentMonthAndRatio() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Add 1 to convert to 1-based month indexing
  const daysInCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  const daysPassedInCurrentMonth = currentDate.getDate();
  const currentMonthRatio = daysPassedInCurrentMonth / daysInCurrentMonth;

  return { currentMonth, currentMonthRatio };
}

export function sumForMonths(data, startMonth, endMonth) {
  let sum = 0;
  for (let month = startMonth; month <= endMonth; month++) {
    sum += data[String(month)];
  }
  return sum;
}

export function calculateYtdData(
  targets,
  results,
  currentMonth,
  currentMonthRatio
) {
  const ytdData = targets.reduce((acc, t) => {
    const result = results.find((r) => r.segment === t.segment);
    if (result) {
      const progress = sumForMonths(result, 1, currentMonth);
      const ytdTargetWithoutCurrentMonth = sumForMonths(t, 1, currentMonth - 1);
      const target =
        ytdTargetWithoutCurrentMonth +
        t[String(currentMonth)] * currentMonthRatio;
      const percent = (progress / target) * 100;

      acc[t.segment] = {
        segment: t.segment,
        progress,
        target,
        percent,
      };
    }
    return acc;
  }, {});

  return ytdData;
}

export const options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};
