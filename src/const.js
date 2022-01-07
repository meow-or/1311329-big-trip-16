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
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: '',
  offers: null,
  type: '',
};

const dateFormat = {
  dateAndTime: 'DD/MM/YYYY HH:mm',
};

export { RANDOM_TEXT, CITIES, TYPES, dateFormat, BLANK_POINT };
