const RANDOM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const CITIES = [
  'Istanbul',
  'Moscow',
  'London',
  'Berlin',
  'Madrid',
  'Rome',
  'Kiev',
  'Paris',
  'Minsk',
  'Bucharest',
  'Vienna',
  'Budapest',
];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const BLANK_POINT = {
  basePrice: 1,
  dateFrom: 1000000,
  dateTo: 1000000,
  destination: {
    description: 'Nunc fermentum tortor ac porta',
    name: 'Paris',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'some description',
      },
      {
        src: 'img/photos/2.jpg',
        description: 'awesome description',
      },
      {
        src: 'img/photos/3.jpg',
        description: 'a little bit of description',
      },
      {
        src: 'img/photos/4.jpg',
        description: 'just description',
      },
      {
        src: 'img/photos/5.jpg',
        description: 'simple description',
      },
    ],
  },
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
  type: 'restaurant',
};

const DateFormat = {
  dateAndTime: 'DD/MM/YYYY HH:mm',
};

const editPointBtnClass = '.event__rollup-btn';
const closeFormBtnClass = '.event--edit .event__rollup-btn';
const deletePointBtnClass = '.event__reset-btn';
const addEventBtnClass = '.trip-main__event-add-btn';

const SortType = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFERS: 'OFFERS'
};

export {
  RANDOM_TEXT,
  CITIES,
  TYPES,
  DateFormat as dateFormat,
  BLANK_POINT,
  editPointBtnClass,
  closeFormBtnClass,
  deletePointBtnClass,
  addEventBtnClass,
  SortType
};
