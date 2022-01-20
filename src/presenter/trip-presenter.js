import TripBoardView from '../view/trip-board-view.js';
import PointsContainerView from '../view/points-container-view.js';
import EmptyListView from '../view/empty-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

const POINT_COUNT = 17;

export default class TripPresenter {
  #tripBoardContainer = null;
  #filterInputs = null;
  #sortfilters = null;

  #tripBoardComponent = new TripBoardView();
  #pointsContainerComponent = new PointsContainerView();

  #tripPoints = [];

  constructor(tripBoardContainer, filterInputs, sortfilters) {
    this.#tripBoardContainer = tripBoardContainer;
    this.#filterInputs = filterInputs;
    this.#sortfilters = sortfilters;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    render(this.#tripBoardContainer, this.#tripBoardComponent, RenderPosition.BEFOREEND);

    this.#renderTripBoard();
  }

  #renderSort = () => {
    render(this.#tripBoardComponent, new SortView(this.#sortfilters), RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsContainerComponent);
    pointPresenter.init(point);
  }

  #renderPoints = () => {
    for (let i = 0; i < POINT_COUNT; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderNoPoints = () => {
    render(this.#tripBoardComponent, new EmptyListView(this.#filterInputs), RenderPosition.BEFOREEND);
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
