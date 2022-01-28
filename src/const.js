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

const OPTIONS = [
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


const BLANK_POINT = {
  basePrice: 0,
  dateFrom: 0,
  dateTo: 0,
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
  type: 'taxi',
};

const DateFormat = {
  dateAndTime: 'DD/MM/YYYY HH:mm',
};

const editPointBtnClass = '.event__rollup-btn';
const closeFormBtnClass = '.event--edit .event__rollup-btn';
const deletePointBtnClass = '.event__reset-btn';
const addEventBtnClass = '.trip-main__event-add-btn';

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
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
  SortType,
  OPTIONS
};
