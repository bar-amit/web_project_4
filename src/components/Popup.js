import { activePopupClass, popupCloseButtonSelector } from "./constants";

export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(popupCloseButtonSelector);
    this._handleClose = (()=>{this.close()}).bind(this);
    this._boundHandleEscapeClose = this._handleEscapeClose.bind(this);
    this._boundHandleOverlayClose = this._handleOverlayClose.bind(this);
  }
  open() {
    this._element.classList.add(activePopupClass);
    this.setEventListeners();
  }
  close() {
    this._element.classList.remove(activePopupClass);
    this.removeEventListeners();
  }
  _handleEscapeClose(e) {
    if(e.key==='Escape') this.close();
  }
  _handleOverlayClose(e) {
    if(e.target.classList.contains(activePopupClass)) this.close();
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', this._handleClose);
    this._element.addEventListener('click', this._boundHandleOverlayClose);
    document.addEventListener('keydown', this._boundHandleEscapeClose);
  }
  removeEventListeners() {
    this._closeButton.removeEventListener('click', this._handleClose);
    this._element.removeEventListener('click', this._boundHandleOverlayClose);
    document.removeEventListener('keydown', this._boundHandleEscapeClose);
  }
}
