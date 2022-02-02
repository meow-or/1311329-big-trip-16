import dayjs from 'dayjs';
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

const createOffersTemplate = (tripoffers) => {
  if (tripoffers.length === 0) {
    offersHeaderClass = 'visually-hidden';

    return (
      '<h3 class="event__section-title  event__section-title--offers"></h3>'
    );

  } else {
    offersHeaderClass = '';

    return tripoffers.map(
      (offer) =>
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offer.title}-1"
            type="checkbox"
            name="event-offer-${offer.title}"
          >

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

const createDestinationPhotoTemplate = (destination) => {
  const { pictures } = destination;

  return pictures.map(
    (picture) =>
      `<img class="event__photo"
        src="${picture.src}"
        alt="${picture.description}">
      </img>`).join('');
};

const createEditPointTemplate = (data) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = data;


  const chooseDestinationTemplate = createChooseDestinationTemplate(destination);
  const destinationListTemplate = createDestinationListTemplate(destination);
  const dateTemplate = createEditPointDateTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const eventTypeTemplate = createEventTypeTemplate(type);
  const currentTypeTemplate = createCurrentPointTypeTemplate(type);
  const typeIconTemplate = createTypeIconTemplate(type);
  const offersTemplate = createOffersTemplate(offers);
  const destinationDescriptionTemplate = createDestinationDescriptionTemplate(destination);
  const destinationPhotoTemplate = createDestinationPhotoTemplate(destination);

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
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhotoTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};
export default class EditPointView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point = BLANK_POINT, tripDestinations, tripPointOffers) {
    super();
    this._data = EditPointView.parsePointToData(point, tripDestinations, tripPointOffers);
    this._tripDestinations = tripDestinations;
    this._tripPointOffers = tripPointOffers;

    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setPointDeleteHandler(this._callback.pointDelete);
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

  reset = (point, tripDestinations, tripPointOffers) => {
    this.updateData(
      EditPointView.parsePointToData(point, tripDestinations, tripPointOffers)
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setPointDeleteHandler(this._callback.pointDelete);
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
        onChange: this.#dateFromClickHandler,
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
        onChange: this.#dateToClickHandler,
      }
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelectorAll('.event__type-input')
      .forEach((input) => input.addEventListener('change', this.#typeChangeHandler));

    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('change', this.#onChooseOfferHandler));

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

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destinationByName = this._tripDestinations.reduce((result, tripDestination) => {
      result[tripDestination.name] = {
        tripDescription: tripDestination.description,
        tripPictures: tripDestination.pictures,
        tripName: tripDestination.name
      };

      return result;
    }, {});

    const currentDestination = destinationByName[evt.target.value];

    this.updateData({
      destination: {
        description: currentDestination.tripDescription,
        name: currentDestination.tripName,
        pictures: currentDestination.tripPictures,
      },
    }, false);
  }

  #dateFromClickHandler = ([userDateFrom]) => {
    this.updateData({
      dateFrom: userDateFrom
    }, true);
  }

  #dateToClickHandler = ([userDateTo]) => {
    this.updateData({
      dateTo: userDateTo
    }, true);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    const offersByType = this._tripPointOffers.reduce((result, pointOffer) => {
      result[pointOffer.type] = {
        pointType: pointOffer.type,
        pointOffers: pointOffer.offers
      };

      return result;
    }, {});

    this.updateData({
      type: evt.target.value,
      offers: offersByType[evt.target.value].pointOffers,

    }, false);

    this.element.querySelector('.event__type-output').textContent = evt.target.value;
    this.element.querySelector('.event__type-icon').setAttribute('src', `img/icons/${evt.target.value}.png`);
  }

  #onChooseOfferHandler = (evt) => {
    const offersByTitle = this._tripPointOffers.find((obj) => obj.offers.find((offer) => `event-offer-${offer.title}` === evt.target.name));

    const clickedOffer = offersByTitle.offers.find((offer) => `event-offer-${offer.title}` === evt.target.name);

    const offersWithoutClickedOffer = offersByTitle.offers.filter((offer) => offer !== clickedOffer);

    this.updateData({
      offers: offersWithoutClickedOffer

    }, false);
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

  static parsePointToData = (point, tripDestinations, tripPointOffers) => ({
    ...point, tripDestinations, tripPointOffers
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    return point;
  };
}
