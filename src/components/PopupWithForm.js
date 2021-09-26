import Popup from "./Popup";
import { formSelectors } from "./Constants";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit.bind(this);
    this._inputs = this._element.querySelectorAll(formSelectors.inputSelector);
    this._values = [];
  }
  _getInputValues() {
    let values = [];
    this._inputs.forEach(input => {
      values.push(input.value);
    });
    this._values = values;
  }
  open(values){
    this.setEventListeners();
    if(values.length===this._inputs.length)
      values.forEach((value, index) => this._inputs[index].value = value);
    super.open();
  }
  close() {
    this.removeEventListeners();
    this._inputs.forEach(input => {
      input.value = '';
    });
    super.close();
  }
  setEventListeners() {
    this._element.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }
  removeEventListeners() {
    this._element.removeEventListener('submit', this._handleSubmit);
    super.removeEventListeners();
  }
}
