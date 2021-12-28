import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';

let offersHeaderClass;

const createChooseDestinationTemplate = (destination) =>
  `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
  <datalist id="destination-list-1">
    <option value="Amsterdam"></option>
    <option value="Geneva"></option>
    <option value="Chamonix"></option>
  </datalist>`;

const createTypeIconTemplate = (type) =>
  `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">`;

const createEditPointDateTemplate = (dateFrom, dateTo) =>
  `<label class="visually-hidden" for="event-start-time-1">From</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
  value="${dayjs(dateFrom).format('DD/MM/YYYY HH:mm')}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">To</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
  value="${dayjs(dateTo).format('DD/MM/YYYY HH:mm')}">`;

const createPriceTemplate = (basePrice) =>
  `<label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">`;

const createCurrentPointTypeTemplate = (type) =>
  `<label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>`;

const createEventTypeTemplate = (type) => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  return types
    .map(
      (pointType) => `<div class="event__type-item">
            <input id="event-type-${pointType}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${pointType}"
            ${type === pointType ? 'checked' : ''}>

            <label
              class="event__type-label  event__type-label--${pointType}"
              for="event-type-${pointType}-1">${pointType}</label>
          </div>`
    )
    .join('');
};

const createOffersTemplate = (offers) => {
  if (offers.length === 0) {
    offersHeaderClass = 'visually-hidden';

    return '<h3 class="event__section-title  event__section-title--offers"></h3>';
  } else {
    offersHeaderClass = '';

    const fragment = new DocumentFragment();

    offers.forEach((offer) => {
      const isChecked = Boolean(getRandomInteger(0, 1));

      const optionSelected = isChecked ? 'checked' : '';

      const textNode = document.createTextNode(
        `<div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${optionSelected}>
            <label class="event__offer-label" for="event-offer-${offer.title}-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`
      );

      fragment.append(textNode);
    });

    const newArr = [];

    fragment.childNodes.forEach((node) => {
      newArr.push(node.nodeValue);
    });

    return newArr.join('');
  }
};

const createDestinationDescriptionTemplate = (destination) =>
  `<p class="event__destination-description">${destination.description}</p>`;

const createDestinationPhotoTemplate = (destination) => {
  const fragment = new DocumentFragment();

  const { pictures } = destination;

  pictures.forEach((picture) => {
    const textNode = document.createTextNode(
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`
    );
    fragment.append(textNode);
  });
  const newArr = [];

  fragment.childNodes.forEach((node) => {
    newArr.push(node.nodeValue);
  });
  return newArr.join('');
};

export const createNewPointTemplate = (point = {}) => {
  const {
    basePrice = 1,
    dateFrom = null,
    dateTo = null,
    destination = '',
    offers,
    type,
  } = point;

  const chooseDestinationTemplate =
    createChooseDestinationTemplate(destination);
  const dateTemplate = createEditPointDateTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const eventTypeTemplate = createEventTypeTemplate(type);
  const currentTypeTemplate = createCurrentPointTypeTemplate(type);
  const typeIconTemplate = createTypeIconTemplate(type);
  const offersTemplate = createOffersTemplate(offers);
  const destinationDescriptionTemplate = createDestinationDescriptionTemplate(destination);
  const destinationPhotoTemplate = createDestinationPhotoTemplate(destination);

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
          ${offersTemplate}
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${destinationDescriptionTemplate}
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhotoTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`;
};

