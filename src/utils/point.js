import dayjs from 'dayjs';

const isFuture = (dateFrom, dateTo) =>
  dayjs().isAfter(dateFrom) || dayjs().isSame(dateFrom) || (dayjs().isBefore(dateFrom) && dayjs().isAfter(dateTo));

const isPast = (dateFrom, dateTo) =>
  dayjs().isBefore(dateTo) || (dayjs().isBefore(dateFrom) && dayjs().isAfter(dateTo));

const sortDayToMin = (prev, next) => dayjs(prev.dateFrom) - dayjs(next.dateFrom);

const sortPriceToMin = (prev, next) => next.basePrice - prev.basePrice;

const sortTimeToMin = (prev, next) => {
  const prevDate1 = dayjs(prev.dateFrom);
  const prevDate2 = dayjs(prev.dateTo);
  const prevDiffDate = prevDate2.diff(prevDate1);

  const nextDate1 = dayjs(next.dateFrom);
  const nextDate2 = dayjs(next.dateTo);
  const nextDiffDate = nextDate2.diff(nextDate1);

  return nextDiffDate - prevDiffDate;
};


export { isFuture, isPast, sortPriceToMin, sortTimeToMin, sortDayToMin };
