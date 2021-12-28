const createSortItemTemplate = (filter, isChecked) => {
  const { name } = filter;

  return `<div class="trip-sort__item  trip-sort__item--${name}">
              <input id="sort-${name}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${name}"
              ${isChecked ? 'checked' : ''}>
            <label class="trip-sort__btn" for="sort-${name}">${name}</label>
          </div>`;
};

export const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sortfilter, index) => createSortItemTemplate(sortfilter, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
};


