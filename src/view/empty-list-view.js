import { createElement } from '../render';

const noEventsMessage = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now'
};

const createEmptyListTemplate = (filterInputs) => {
  const checkedInput = filterInputs.find((input) => input.hasAttribute('checked'));

  return `<p class="trip-events__msg">
            ${noEventsMessage[checkedInput.value]}
          </p>`;
};

export default class EmptyListView {
  #element = null;
  #filterInputs = null;

  constructor(filterInputs) {
    this.#filterInputs = filterInputs;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyListTemplate(this.#filterInputs);
  }

  removeElement() {
    this.#element = null;
  }
}
