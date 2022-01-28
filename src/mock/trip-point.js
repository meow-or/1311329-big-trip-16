import { getRandomInteger } from '../utils/common.js';
import { CITIES, TYPES } from '../const.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const MIN_PRICE = 10;
const MAX_PRICE = 300;
const MIN_DAYS_GAP = 1;
const MAX_DAYS_GAP = 3;

const generateDateFrom = () => {
  const daysGapDateFrom = getRandomInteger(-MAX_DAYS_GAP, MIN_DAYS_GAP);

  return dayjs().add(daysGapDateFrom, 'day').toDate();
};

const generateDateTo = () => {
  const daysGapDateTo = getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP);

  return dayjs().add(daysGapDateTo, 'day').toDate();
};

export const generatePoint = () => {

  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo();

  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom,
    dateTo,
    destination: CITIES[getRandomInteger(0, CITIES.length - 1)],
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [],
    type: TYPES[getRandomInteger(0, TYPES.length - 1)],
  };
};

