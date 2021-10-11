import Popup from "./Popup";
import { formSelectors } from "./constants";

export default class PopupWithForm extends Popup {
  constructor(selector, {handleSubmit, resetValidation}) {
    super(selector);
    this._handleSubmit = handleSubmit.bind(this);
    this._resetValidation = resetValidation;
    this._inputs = Array.from(this._element.querySelectorAll(formSelectors.inputSelector));
    this._form = this._element.querySelector(formSelectors.formSelector);
  }
  _setInputValues = (values) => {
    for (const [key, value] of Object.entries(values)) {
      const input = this._inputs.find(input => input.name === key);
      if(typeof input !== 'undefined')
        input.value = value;
    }
  }
  _getInputValues = () => {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }
  open = (values) => {
    this.setEventListeners();
    this._setInputValues(values);
    super.open();
  }
  close = () => {
    this.removeEventListeners();
    this._resetValidation();
    super.close();
    this._form.reset();
  }
  setEventListeners = () => {
    this._element.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }
  removeEventListeners = () => {
    this._element.removeEventListener('submit', this._handleSubmit);
    super.removeEventListeners();
  }
}