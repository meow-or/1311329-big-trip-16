import { createElement } from '../render';

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

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sortfilter, index) => createSortItemTemplate(sortfilter, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
};

export default class SortView {
  #element = null;
  #sortfilters = null;

  constructor(sortfilters) {
    this.#sortfilters = sortfilters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortTemplate(this.#sortfilters);
  }

  removeElement() {
    this.#element = null;
  }
}
