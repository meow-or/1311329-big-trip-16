import { isFuture, isPast } from '../utils/point';

const pointToFilterMap = {
  everything: (points) => points,
  future: (points) => points.filter((point) => isFuture(point.dateFrom, point.dateTo)),
  past: (points) => points.filter((point) => isPast(point.dateFrom, point.dateTo)),
};

export const generateFilter = () => Object.entries(pointToFilterMap).map(
  ([filterName]) => ({
    name: filterName,
  }),
);
