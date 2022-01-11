import { createElement } from '../render';

const createContentContainerTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ContentContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createContentContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
