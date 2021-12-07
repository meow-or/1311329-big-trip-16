import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFiltersTemplate } from './view/filters-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createContentContainerTemplate } from './view/content-container-view.js';
import { createNewPointTemplate } from './view/new-point-view';
import { createEditPointTemplate } from './view/edit-point-view.js';
import { createTripPointTemplate } from './view/trip-point-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const POINT_COUNT = 3;

const siteHeaderElement = document.querySelector('header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');

renderTemplate(siteNavigationElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');

renderTemplate(filtersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('main');
const tripSortElement = siteMainElement.querySelector('.trip-events');

renderTemplate(tripSortElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripSortElement, createContentContainerTemplate(), RenderPosition.BEFOREEND);

const pointsContainer = document.querySelector('.trip-events__list');

renderTemplate(pointsContainer, createEditPointTemplate(), RenderPosition.BEFOREEND);
renderTemplate(pointsContainer, createNewPointTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(
    pointsContainer,
    createTripPointTemplate(),
    RenderPosition.BEFOREEND
  );
}


