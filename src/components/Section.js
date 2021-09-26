export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }
  addItem(element) {
    const newElement = this._renderer(element);
    this._container.prepend(newElement);
  }
}
