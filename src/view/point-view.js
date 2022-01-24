import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';
import { editPointBtnClass } from '../const.js';

const HOUR = 3600000;
const DAY = 86400000;

const createPointOfferTemplate = (offers) => {
  if (offers.length === 0) {
    return '';

  } else {
    return offers.map(
      (offer) => `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`).join('');
  }
};

const createTripPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = point;

  const dateStart = dayjs(dateFrom).format('D MMM');

  const dateStartAttr = dayjs(dateFrom).format('YYYY-DD-MM');
  const datetimeStartAttr = dayjs(dateFrom).format('YYYY-DD-MMTHH:mm');
  const dateStartTime = dayjs(dateFrom).format('HH:mm');

  const dateFinishTime = dayjs(dateTo).format('HH:mm');
  const dateFinishAttr = dayjs(dateTo).format('YYYY-DD-MMTHH:mm');

  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const diffDate = date2.diff(date1);

  const getRemainingTime = () => {

    if (diffDate < HOUR) {
      return `${dayjs(diffDate).format('mm')}M`;
    } else if (diffDate > HOUR && diffDate < DAY) {
      return `${dayjs(diffDate).format('HH')}H
              ${dayjs(diffDate).format('mm')}M`;
    } else {
      return `${dayjs(diffDate).format('DD')}D
              ${dayjs(diffDate).format('HH')}H
              ${dayjs(diffDate).format('mm')}M`;
    }
  };

  const remainingTime = getRemainingTime();

  const favoriteClass = isFavorite
    ?  '--active'
    :  '';

  const pointOfferTemplate = createPointOfferTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateStartAttr}">${dateStart}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${datetimeStartAttr}">${dateStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateFinishAttr}">${dateFinishTime}</time>
          </p>
          <p class="event__duration">${remainingTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${pointOfferTemplate}
        </ul>
        <button class="event__favorite-btn event__favorite-btn${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
export default class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector(editPointBtnClass).addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = () => {
    this._callback.editClick();
  };

  #favoriteClickHandler = () => {
    this._callback.favoriteClick();
  }
}
