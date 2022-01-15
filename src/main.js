import SiteMenuView from './view/site-menu-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import PointsContainerView from './view/content-container-view.js';
import EditPointView from './view/edit-point-view.js';
import EmptyListView from './view/empty-list-view.js';
import PointView from './view/trip-point-view.js';
import { RenderPosition, render, replace } from './utils/render.js';
import { generatePoint } from './mock/trip-point.js';
import { generateFilter } from './mock/filter.js';
import { generateSortFilter } from './mock/sort.js';

const POINT_COUNT = 17;

const points = Array.from({ length: POINT_COUNT }, generatePoint);
const filters = generateFilter(points);
const sortfilters = generateSortFilter(points);
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
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
    pointEditComponent.setFormCloseHandler(() => {
      replaceFormToPoint();
    });
    pointEditComponent.setPointDeleteHandler(() => {
      pointEditComponent.element.remove();
    });
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
};

const renderPointsBoard = () => {
  const pointsContainerComponent = new PointsContainerView();

  if (points.length === 0) {
    render(mainContentContainer, new EmptyListView(filterInputs), RenderPosition.BEFOREEND);
  } else {
    render(mainContentContainer, new SortView(sortfilters), RenderPosition.BEFOREEND);
    render(mainContentContainer, pointsContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < POINT_COUNT; i++) {
      renderPoint(pointsContainerComponent.element, points[i]);
    }
  }
};

render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, filtersComponent, RenderPosition.BEFOREEND);

renderPointsBoard();
