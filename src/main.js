import SiteMenuView from './view/site-menu-view.js';
import FiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { RenderPosition, render } from './utils/render.js';
import { generatePoint } from './mock/trip-point.js';
import { generateFilter } from './mock/filter.js';
import { generateSortFilter } from './mock/sort.js';

const POINT_COUNT = 17;

const siteHeaderElement = document.querySelector('header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filtersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('main');
const mainContentContainer = siteMainElement.querySelector('.page-body__container');

const points = Array.from({ length: POINT_COUNT }, generatePoint);
const filters = generateFilter(points);
const sortfilters = generateSortFilter(points);
const filtersComponent = new FiltersView(filters);
const filterInputs = Array.from(filtersComponent.element.querySelectorAll('input'));

const tripBoardPresenter = new TripPresenter(mainContentContainer, filterInputs, sortfilters);

render(siteNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, filtersComponent, RenderPosition.BEFOREEND);

tripBoardPresenter.init(points);
