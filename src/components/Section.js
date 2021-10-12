export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems = (items) => {
    items.forEach(this.addItem);
  }
  addItem = (element) => {
    const newElement = this._renderer(element);
    this._container.prepend(newElement);
  }
}
