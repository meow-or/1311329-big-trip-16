import { getRandomInteger } from '../utils/common.js';
import { RANDOM_TEXT } from '../const.js';

const MIN_NUMBER_OF_SENTENCES = 1;
const MAX_NUMBER_OF_SENTENCES = 5;

const generateDescription = () => {
  const descriptions = Array.from(RANDOM_TEXT.split('. '));

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  const randomCount = getRandomInteger(MIN_NUMBER_OF_SENTENCES, MAX_NUMBER_OF_SENTENCES);

  const generateRandomDescription = () => descriptions[randomIndex];

  const newDescriptions = Array.from({ length: randomCount }, generateRandomDescription);

  const randomDescription = newDescriptions.join('. ');

  return randomDescription;
};

export const MOCKDESTINATIONS = [

  {
    description: generateDescription(),
    name: 'Istanbul',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Moscow',
    pictures: [
      {
        src: 'img/photos/2.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'London',
    pictures: [
      {
        src: 'img/photos/3.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Berlin',
    pictures: [
      {
        src: 'img/photos/4.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Madrid',
    pictures: [
      {
        src: 'img/photos/5.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Rome',
    pictures: [
      {
        src: 'img/photos/2.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Kiev',
    pictures: [
      {
        src: 'img/photos/3.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Paris',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Minsk',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Bucharest',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Vienna',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
  {
    description: generateDescription(),
    name: 'Budapest',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/1.jpg',
        description: 'simple description',
      },
    ],
  },
];
