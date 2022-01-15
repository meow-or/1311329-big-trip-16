import AbstractView from './abstract-view.js';

const noEventsMessage = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now',
};

const createEmptyListTemplate = (filterInputs) => {
  const checkedInput = filterInputs.find((input) =>
    input.hasAttribute('checked')
  );

  return `<p class="trip-events__msg">
      ${noEventsMessage[checkedInput.value]}
    </p>`;
};

export default class EmptyListView extends AbstractView {
  #filterInputs = null;

  constructor(filterInputs) {
    super();
    this.#filterInputs = filterInputs;
  }

  get template() {
    return createEmptyListTemplate(this.#filterInputs);
  }
}
