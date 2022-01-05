import { getRandomInteger, createRandomIdFromRange } from '../utils.js';
import { RANDOM_TEXT, CITIES } from '../const.js';
import dayjs from 'dayjs';

const MIN_NUMBER_OF_SENTENCES = 1;
const MAX_NUMBER_OF_SENTENCES = 5;
const MIN_PRICE = 10;
const MAX_PRICE = 300;
const MIN_PICTURE_NUMBER = 1;
const MAX_PICTURE_NUMBER = 5;
const MIN_DAYS_GAP = 1;
const MAX_DAYS_GAP = 3;

const generateId = createRandomIdFromRange(0, 1000);

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


const generateDestination = () => {

  const randomPicture = createRandomIdFromRange(MIN_PICTURE_NUMBER, MAX_PICTURE_NUMBER);

  return {
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
  };
};

const generateOffer = () => {
  const options = [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'Upgrade to a buisness class',
          price: 120,
        },
        {
          id: 2,
          title: 'Choose the radio station',
          price: 12,
        },
      ],
    },
    {
      type: 'bus',
      offers: [
        {
          id: 1,
          title: 'tea in a faceted glass',
          price: 1,
        },
        {
          id: 2,
          title: 'linen',
          price: 3,
        },
      ],
    },
    {
      type: 'train',
      offers: [
        {
          id: 1,
          title: 'Compartment',
          price: 50,
        },
        {
          id: 2,
          title: 'Luxury',
          price: 75,
        },
        {
          id: 3,
          title: 'Luggage',
          price: 6,
        },
        {
          id: 4,
          title: 'some meal',
          price: 10,
        },
      ],
    },
    {
      type: 'ship',
      offers: [
        {
          id: 1,
          title: 'laundry',
          price: 10,
        },
        {
          id: 2,
          title: 'sauna',
          price: 80,
        },
      ],
    },
    {
      type: 'drive',
      offers: [

      ],
    },
    {
      type: 'flight',
      offers: [
        {
          id: 1,
          title: 'econom',
          price: 300,
        },
        {
          id: 2,
          title: 'business class',
          price: 500,
        },
      ],
    },
    {
      type: 'flight',
      offers: [
        {
          id: 1,
          title: 'ты не понял, мы domoi letim, vodo4ki nam prinesi',
          price: 300,
        },
        {
          id: 2,
          title: 'business class',
          price: 500,
        },
      ],
    },
    {
      type: 'check-in',
      offers: [
        {
          id: 1,
          title: 'some option',
          price: 0.1,
        },
        {
          id: 2,
          title: 'check',
          price: 999,
        },
        {
          id: 3,
          title: 'option №3',
          price: 1.5,
        },
      ],
    },
    {
      type: 'sightseeing',
      offers: [

      ],
    },
    {
      type: 'restaurant',
      offers: [
        {
          id: 1,
          title: 'pelmeni',
          price: 25,
        },
        {
          id: 2,
          title: 'vodka',
          price: 5,
        },
      ],
    },
  ];

  const randomOption = getRandomInteger(0, options.length - 1);

  return options[randomOption];
};

export const generatePoint = () => {

  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo();
  const typeOffers = generateOffer();

  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    id: generateId(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: typeOffers.offers,
    type: typeOffers.type,
  };
};

