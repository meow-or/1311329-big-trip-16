import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';
import { TYPES, CITIES, dateFormat, BLANK_POINT } from '../const.js';
import { createElement } from '../render.js';

let offersHeaderClass;

const createChooseDestinationTemplate = (destination) =>
  `<input class="event__input  event__input--destination"
    id="event-destination-1"
    type="text"
    name="event-destination"
    value="${destination.name}"
    list="destination-list-1">`;

const createDestinationListTemplate = () =>
  CITIES.map((city) =>
    `<option value="${city}">${city}</option>`).join('');

const createTypeIconTemplate = (type) => (
  `<img class="event__type-icon"
    width="17"
    height="17"
    src="img/icons/${type}.png"
    alt="Event type icon">`
);

const createEditPointDateTemplate = (dateFrom, dateTo) => {

  const startTime = dayjs(dateFrom).format(dateFormat.dateAndTime);
  const finishTime = dayjs(dateTo).format(dateFormat.dateAndTime);

  return `<label class="visually-hidden" for="event-start-time-1">From</label>

          <input class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${startTime}">
            &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>

          <input class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${finishTime}">`;
};

const createPriceTemplate = (basePrice) => (
  `<label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>

  <input class="event__input  event__input--price"
    id="event-price-1"
    type="text"
    name="event-price"
    value="${basePrice}">`
);

const createCurrentPointTypeTemplate = (type) => (
  `<label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>`);

const createEventTypeTemplate = (type) =>

  TYPES.map((pointType) =>
    `<div class="event__type-item">
      <input id="event-type-${pointType}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${pointType}"
        ${type === pointType ? 'checked' : ''}>

      <label
        class="event__type-label  event__type-label--${pointType}"
        for="event-type-${pointType}-1">${pointType}
      </label>
    </div>`).join('');

const createOffersTemplate = (offers) => {
  if (offers.length === 0) {
    offersHeaderClass = 'visually-hidden';

    return '<h3 class="event__section-title  event__section-title--offers"></h3>';

  } else {
    offersHeaderClass = '';
    const isChecked = Boolean(getRandomInteger(0, 1));
    const optionSelected = isChecked ? 'checked' : '';

    return offers.map(
      (offer) =>
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offer.title}-1"
            type="checkbox"
            name="event-offer-${offer.title}"
            ${optionSelected}>

            <label class="event__offer-label"
              for="event-offer-${offer.title}-1">
              <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('');
  }
};

const createDestinationDescriptionTemplate = (destination) => (
  `<p class="event__destination-description">${destination.description}</p>`
);

const createEditPointTemplate = (point = {}) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;

  const chooseDestinationTemplate = createChooseDestinationTemplate(destination);
  const destinationListTemplate = createDestinationListTemplate(destination);
  const dateTemplate = createEditPointDateTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const eventTypeTemplate = createEventTypeTemplate(type);
  const currentTypeTemplate = createCurrentPointTypeTemplate(type);
  const typeIconTemplate = createTypeIconTemplate(type);
  const offersTemplate = createOffersTemplate(offers);
  const destinationDescriptionTemplate = createDestinationDescriptionTemplate(destination);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    ${typeIconTemplate}
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${eventTypeTemplate}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  ${currentTypeTemplate}
                  ${chooseDestinationTemplate}
                    <datalist id="destination-list-1">
                      ${destinationListTemplate}
                    </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  ${dateTemplate}
                </div>

                <div class="event__field-group  event__field-group--price">
                  ${priceTemplate}
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers ${offersHeaderClass}">Offers</h3>
                <div class="event__available-offers">
                  ${offersTemplate}
                </div>
                </section>
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  ${destinationDescriptionTemplate}
                </section>
              </section>
            </form>
          </li>`;
};

export default class EditPointView {
  #element = null;
  #point = null;

  constructor(point = BLANK_POINT) {
    this.#point = point;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
