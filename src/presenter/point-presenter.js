import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

export default class PointPresenter {
  #pointsContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(pointsContainer) {
    this.#pointsContainer = pointsContainer;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditPointView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormCloseHandler(this.#handleFormCloseClick);
    this.#pointEditComponent.setPointDeleteHandler(this.#handleDeletePointClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointsContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointsContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  }

  #handleFormCloseClick = () => {
    this.#replaceFormToPoint();
  }

  #handleDeletePointClick = () => {
    remove(this.#pointEditComponent);
  }

  #handleEditFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  }
}
