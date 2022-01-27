import { getRandomInteger, createRandomIdFromRange } from '../utils/common.js';
import { RANDOM_TEXT, CITIES, OPTIONS } from '../const.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const MIN_NUMBER_OF_SENTENCES = 1;
const MAX_NUMBER_OF_SENTENCES = 5;
const MIN_PRICE = 10;
const MAX_PRICE = 300;
const MIN_PICTURE_NUMBER = 1;
const MAX_PICTURE_NUMBER = 5;
const MIN_DAYS_GAP = 1;
const MAX_DAYS_GAP = 3;

const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const generateDateFrom = () => {
  const daysGapDateFrom = getRandomInteger(-MAX_DAYS_GAP, MIN_DAYS_GAP);

  return dayjs().add(daysGapDateFrom, 'day').toDate();
};

const generateDateTo = () => {
  const daysGapDateTo = getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP);

  return dayjs().add(daysGapDateTo, 'day').toDate();
};


const generateDescription = () => {
  const descriptions = Array.from(RANDOM_TEXT.split('. '));

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  const randomCount = getRandomInteger(MIN_NUMBER_OF_SENTENCES, MAX_NUMBER_OF_SENTENCES);

  const generateRandomDescription = () => descriptions[randomIndex];

  const newdescriptions = Array.from({ length: randomCount }, generateRandomDescription);

  const randomDescription = newdescriptions.join('. ');

  return randomDescription;
};


const createDestination = () => {

  const randomPicture = createRandomIdFromRange(MIN_PICTURE_NUMBER, MAX_PICTURE_NUMBER);

  return () => ({
    description: generateDescription(),
    name: generateCity(),
    pictures: [
      {
        src: `img/photos/${randomPicture()}.jpg`,
        description: 'some description',
      },
      {
        src: `img/photos/${randomPicture()}.jpg`,
        description: 'awesome description',
      },
      {
        src: `img/photos/${randomPicture()}.jpg`,
        description: 'a little bit of description',
      },
      {
        src: `img/photos/${randomPicture()}.jpg`,
        description: 'just description',
      },
      {
        src: `img/photos/${randomPicture()}.jpg`,
        description: 'simple description',
      },
    ],
  });

};

const generateOffer = () => {

  const randomOption = getRandomInteger(0, OPTIONS.length - 1);

  return OPTIONS[randomOption];
};

export const generatePoint = () => {

  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo();
  const typeOffers = generateOffer();
  const generateDestination = createDestination();
  const destination = generateDestination();

  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom,
    dateTo,
    destination,
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: typeOffers.offers,
    type: typeOffers.type,
  };
};

