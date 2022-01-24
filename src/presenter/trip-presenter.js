import TripBoardView from '../view/trip-board-view.js';
import PointsContainerView from '../view/points-container-view.js';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition } from '../utils/render.js';
import { sortDayToMin, sortPriceToMin, sortTimeToMin } from '../utils/point.js';
import { SortType } from '../const.js';

const POINT_COUNT = 17;

export default class TripPresenter {
  #tripBoardContainer = null;
  #filterInputs = null;
  #sortfilters = null;
  #sortComponent = null;

  #tripBoardComponent = new TripBoardView();
  #pointsContainerComponent = new PointsContainerView();

  #tripPoints = [];
  #pointPresenter = new Map();
  #currentSortType = null;
  #sourcedTripPoints = [];

  constructor(tripBoardContainer, filterInputs, sortfilters) {
    this.#tripBoardContainer = tripBoardContainer;
    this.#filterInputs = filterInputs;
    this.#sortfilters = sortfilters;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    this.#sourcedTripPoints = this.#tripPoints.sort(sortDayToMin);

    render(this.#tripBoardContainer, this.#tripBoardComponent, RenderPosition.BEFOREEND);

    this.#renderTripBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType.toUpperCase()) {

      case SortType.DAY:
        this.#tripPoints.sort(sortDayToMin);
        this.#currentSortType = SortType.DAY;
        break;
      case SortType.EVENT:
        this.#tripPoints.sort(sortDayToMin);
        this.#currentSortType = SortType.EVENT;
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortTimeToMin);
        this.#currentSortType = SortType.TIME;
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPriceToMin);
        this.#currentSortType = SortType.PRICE;
        break;
      case SortType.OFFERS:
        this.#tripPoints.sort(sortDayToMin);
        this.#currentSortType = SortType.OFFERS;
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsContainer();
    this.#renderPoints();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortfilters);
    render(this.#tripBoardComponent, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      this.#pointsContainerComponent,
      this.#handlePointChange,
      this.#handleModeChange
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    for (let i = 0; i < POINT_COUNT; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderNoPoints = () => {
    render(this.#tripBoardComponent, new EmptyListView(this.#filterInputs), RenderPosition.BEFOREEND);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointsContainer = () => {
    render(this.#tripBoardComponent, this.#pointsContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderTripBoard = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      this.#renderPointsContainer();
      this.#renderPoints();
    }
  }
}
