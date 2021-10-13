import Popup from "./Popup";
import { popupTitleSelector, popupImageSelector } from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._title = this._element.querySelector(popupTitleSelector);
    this._image = this._element.querySelector(popupImageSelector);
  }
  open({link, name}) {
    this._title.textContent = name;
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    super.open();
  }
}
