import { sortPriceToMin, sortTimeToMin } from '../utils/point';

const pointToSortMap = {
  day: (points) => points,
  event: (points) => points,
  time: (points) =>
    points.sort(sortTimeToMin),
  price: (points) =>
    points.sort(sortPriceToMin),
  offers: (points) => points,
};

export const generateSortFilter = () =>
  Object.entries(pointToSortMap).map(([sortName]) => ({
    name: sortName
  }));
