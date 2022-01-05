import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createRandomIdFromRange = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= max - min + 1) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const isFuture = (dateFrom, dateTo) =>
  dayjs().isAfter(dateFrom) || dayjs().isSame(dateFrom) || (dayjs().isBefore(dateFrom) && dayjs().isAfter(dateTo));

const isPast = (dateFrom, dateTo) =>
  dayjs().isBefore(dateTo) || (dayjs().isBefore(dateFrom) && dayjs().isAfter(dateTo));

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


export { getRandomInteger, createRandomIdFromRange, isFuture, isPast, sortPriceToMin, sortTimeToMin };
