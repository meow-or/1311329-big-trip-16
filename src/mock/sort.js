import { SortType } from '../const.js';

export const generateSortFilter = () =>
  Object.entries(SortType).map(([sortName]) => ({
    name: sortName
  }));
