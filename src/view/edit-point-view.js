import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common.js';
import { TYPES, CITIES, dateFormat, BLANK_POINT } from '../const.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { closeFormBtnClass, deletePointBtnClass } from '../const.js';

let offersHeaderClass;

const createChooseDestinationTemplate = (destination) => (
  `<input class="event__input  event__input--destination"
    id="event-destination-1"
    type="text"
    name="event-destination"
    value="${destination.name}"
    list="destination-list-1"
  >`
);

const createDestinationListTemplate = () =>
  CITIES.map((city) =>
    `<option value="${city}">${city}</option>`).join('');

const createTypeIconTemplate = (type) => (
  `<img class="event__type-icon"
    width="17"
    height="17"
    src="img/icons/${type}.png"
    alt="Event type icon"
  >`
);

const createEditPointDateTemplate = (dateFrom, dateTo) => {

  const startTime = dayjs(dateFrom).format(dateFormat.dateAndTime);
  const finishTime = dayjs(dateTo).format(dateFormat.dateAndTime);

  return (
    `<label class="visually-hidden" for="event-start-time-1">From</label>

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
      value="${finishTime}"
    >`
  );
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
    value="${basePrice}"
  >`
);

const createCurrentPointTypeTemplate = (type) => (
  `<label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>`
);

const createEventTypeTemplate = (type) =>

  TYPES.map((pointType) =>
    `<div class="event__type-item">
      <input id="event-type-${pointType}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${pointType}"
        ${pointType === type ? 'checked' : ''}>

      <label
        class="event__type-label  event__type-label--${pointType}"
        for="event-type-${pointType}-1">${pointType}
      </label>
    </div>`).join('');

const createOffersTemplate = (offers) => {
  if (offers.length === 0) {
    offersHeaderClass = 'visually-hidden';

    return (
      '<h3 class="event__section-title  event__section-title--offers"></h3>'
    );

  } else {
    offersHeaderClass = '';

    return offers.map(
      (offer) =>
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offer.title}-1"
            type="checkbox"
            name="event-offer-${offer.title}
          ">

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

const createEditPointTemplate = (data) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = data;
  //console.log(data);
  const chooseDestinationTemplate = createChooseDestinationTemplate(destination);
  const destinationListTemplate = createDestinationListTemplate(destination);
  const dateTemplate = createEditPointDateTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const eventTypeTemplate = createEventTypeTemplate(type);
  const currentTypeTemplate = createCurrentPointTypeTemplate(type);
  const typeIconTemplate = createTypeIconTemplate(type);
  const offersTemplate = createOffersTemplate(offers);
  const destinationDescriptionTemplate = createDestinationDescriptionTemplate(destination);

  return (
    `<li class="trip-events__item">
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
    </li>`
  );
};
export default class EditPointView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point = BLANK_POINT) {
    super();
    this._data = EditPointView.parsePointToData(point);

    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createEditPointTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset = (point) => {
    this.updateData(
      EditPointView.parsePointToData(point)
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setFormCloseHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector(closeFormBtnClass).addEventListener('click', this.#closeFormHandler);
  };

  setPointDeleteHandler = (callback) => {
    this._callback.pointDelete = callback;
    this.element.querySelector(deletePointBtnClass).addEventListener('click', this.#deletePointHandler);
  };

  #setDateFromPicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateFrom,
        onClose: this.#dateFromClickHandler,
      }
    );
  }

  #setDateToPicker = () => {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTo,
        onClose: this.#dateToClickHandler,
      }
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);

    this.element.querySelectorAll('.event__type-input')
      .forEach((input) => input.addEventListener('change', this.#typeChangeHandler));

    this.element.querySelector('#event-start-time-1').addEventListener('input', this.#dateFromChangeHandler);
    this.element.querySelector('#event-end-time-1').addEventListener('input', this.#dateToChangeHandler);
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  #dateFromChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateFrom: evt.target.value,
    }, true);
  }

  #dateToChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateTo: evt.target.value,
    }, true);
  }

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: {
        name: evt.target.value
      },
    }, true);
  }

  #dateFromClickHandler = ([userDateFrom]) => {
    this.updateData({
      dateFrom: userDateFrom
    });
  }

  #dateToClickHandler = ([userDateTo]) => {
    this.updateData({
      dateTo: userDateTo
    });
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      type: evt.target.value,
    }, true);

    this.element.querySelector('.event__type-output').textContent = evt.target.value;
    this.element.querySelector('.event__type-icon').setAttribute('src', `img/icons/${evt.target.value}.png`);
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseDataToPoint(this._data));
  };

  #closeFormHandler = () => {
    this._callback.formClose();
  };

  #deletePointHandler = () => {
    this._callback.pointDelete();
  };

  static parsePointToData = (point) => ({
    ...point,
    // isTypeChanged: point.type !== null,
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    // if (!point.isTypeChanged) {
    //   point.type = null;
    // }

    // delete point.isTypeChanged;

    return point;
  };
}
