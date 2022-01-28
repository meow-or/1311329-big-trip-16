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
  basePrice: 0,
  dateFrom: 0,
  dateTo: 0,
  destination: '',
  offers: null,
  type: '',
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
  SortType
};
