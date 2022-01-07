import SiteMenuView from './view/site-menu-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import PointsContainerView from './view/content-container-view.js';
import EditPointView from './view/edit-point-view.js';
import EmptyListView from './view/empty-list-view.js';
import PointView from './view/trip-point-view.js';
import { RenderPosition, render } from './render.js';
import { generatePoint } from './mock/trip-point.js';
import { generateFilter } from './mock/filter.js';
import { generateSortFilter } from './mock/sort.js';

const POINT_COUNT = 16;

const points = Array.from({ length: POINT_COUNT }, generatePoint);
const filters = generateFilter(points);
const sortfilters = generateSortFilter(points);
const editPointBtnClass = '.event__rollup-btn';
const closeFormBtnClass = '.event--edit .event__rollup-btn';
const siteHeaderElement = document.querySelector('header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filtersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('main');
const mainContentContainer = siteMainElement.querySelector('.trip-events');
const filtersComponent = new FiltersView(filters);
const filterInputs = Array.from(filtersComponent.element.querySelectorAll('input'));

const renderPoint = (pointsContainer, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointsContainer.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointsContainer.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
      pointEditComponent.element.querySelector(closeFormBtnClass).removeEventListener('click', replaceFormToPoint);
    }
  };

  pointComponent.element
    .querySelector(editPointBtnClass)
    .addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
      pointEditComponent.element.querySelector(closeFormBtnClass).addEventListener('click', replaceFormToPoint);
    });

  pointEditComponent.element
    .querySelector('form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
      pointEditComponent.element.querySelector(closeFormBtnClass).removeEventListener('click', replaceFormToPoint);
    });

  render(pointsContainer, pointComponent.element, RenderPosition.BEFOREEND);
};

const renderPointsBoard = () => {
  const pointsContainerComponent = new PointsContainerView();

  if (points.length === 0) {
    render(mainContentContainer, new EmptyListView(filterInputs).element, RenderPosition.BEFOREEND);
  } else {
    render(mainContentContainer, new SortView(sortfilters).element, RenderPosition.BEFOREEND);
    render(mainContentContainer, pointsContainerComponent.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < POINT_COUNT; i++) {
      renderPoint(pointsContainerComponent.element, points[i]);
    }
  }
};

render(siteNavigationElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(filtersContainer, filtersComponent.element, RenderPosition.BEFOREEND);

renderPointsBoard();
