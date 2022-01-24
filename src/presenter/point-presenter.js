import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NewPointView from '../view/new-point-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};
export default class PointPresenter {
  #pointsContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #newPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    const prevNewPointComponent = this.#newPointComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditPointView(point);
    this.#newPointComponent = new NewPointView();

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormCloseHandler(this.#handleFormCloseClick);
    this.#pointEditComponent.setPointDeleteHandler(this.#handleDeletePointClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditFormSubmit);

    this.#newPointComponent.setNewEventClickHandler(this.#handleNewEventClick);

    if (prevPointComponent === null || prevPointEditComponent === null || prevNewPointComponent === null) {
      render(this.#pointsContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    if (this.#mode === Mode.CREATING) {
      replace(this.#newPointComponent, prevNewPointComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
    remove(prevNewPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
    remove(this.#newPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
      this.#replaceNewEventFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #renderNewEventForm = () => {
    //render(this.#pointsContainer, this.#newPointComponent, RenderPosition.BEFOREEND);
    //replace(this.#newPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.CREATING;
  }

  #replaceNewEventFormToPoint = () => {
    replace(this.#pointComponent, this.#newPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  }

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      this.#replaceNewEventFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleFormCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handleDeletePointClick = () => {
    remove(this.#pointEditComponent);
  };

  #handleEditFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };

  #handleNewEventClick = () => {
    this.#renderNewEventForm();
  };
}
