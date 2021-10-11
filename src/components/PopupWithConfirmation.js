import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, buttonSelector){
    super(selector);
    this._handleConfirm = () => this.close();
    this._buttonElement = this._element.querySelector(buttonSelector);
  }
  open = (handleConfirm) => {
    this._handleConfirm = () => {
      handleConfirm();
      this.close();
    }
    this.setEventListeners();
    super.open();
  }
  close = () => {
    this.removeEventListeners();
    super.close();
  }
  setEventListeners = () => {
    this._buttonElement.addEventListener('click', this._handleConfirm);
    super.setEventListeners();
  }
  removeEventListeners = () => {
    this._buttonElement.removeEventListener('click', this._handleConfirm);
    super.removeEventListeners();
  }
}
