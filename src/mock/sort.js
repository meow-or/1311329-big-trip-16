const pointToSortMap = {
  day: 'day',
  event: 'event',
  time: 'time',
  price: 'price',
  offers: 'offers',
};

export const generateSortFilter = () =>
  Object.entries(pointToSortMap).map(([sortName]) => ({
    name: sortName,
  }));
