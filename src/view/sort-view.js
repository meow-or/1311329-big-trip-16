import AbstractView from './abstract-view.js';

const createSortItemTemplate = (filter, isChecked) => {
  const sortTypeName = filter.name.toLowerCase();

  const isDisabled = () => sortTypeName === 'event' || sortTypeName === 'offers' ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sortTypeName}">
      <input id="sort-${sortTypeName}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortTypeName}"
        data-sort-type="${sortTypeName}"
        ${isDisabled()}
        ${isChecked ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${sortTypeName}">${sortTypeName}</label>
    </div>`;
};

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sortfilter, index) => createSortItemTemplate(sortfilter, index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #sortfilters = null;

  constructor(sortfilters) {
    super();
    this.#sortfilters = sortfilters;
  }

  get template() {
    return createSortTemplate(this.#sortfilters);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler =  (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
