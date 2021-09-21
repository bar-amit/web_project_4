import Validation from './validation.js';

/*
  DOM elements:
*/

// Selectors & classes
const popupSelector = ".popup";
const activePopupClass = "popup_visible";
const cardSelectors = {
  cardSelector: ".card",
  cardTemplateSelector: ".card__template",
  cardTitleSelector: ".card__title",
  cardImageSelector: ".card__image",
  cardLikeSelector: ".card__like-button",
  cardDeleteSelector: ".card__delete-button",
  activelikeButtonClass: "card__like-button_active"
}
const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_visible"
}

// Forms
const profileFormElement = document.querySelector('.popup__form_name_edit-profile');
const pictureFormElement = document.querySelector('.popup__form_name_new-place');

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Inputs
const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// Profile
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

// Popups
const popupEdit = document.querySelector('.popup_name_edit-profile');
const popupNew = document.querySelector('.popup_name_new-place');
const popupPicture = document.querySelector('.popup_name_picture');

const pictureTitle = popupPicture.querySelector('.popup__picture-title');
const pictureImage = popupPicture.querySelector('.popup__picture');

// Cards container
const cardsContainer = document.querySelector('.gallery__container');

/*
  Form Validation:
*/

const profileFormValidation = new Validation(formSelectors, profileFormElement);
const pictureFormValidation = new Validation(formSelectors, pictureFormElement);

export {popupSelector, activePopupClass, cardSelectors, editButton, addButton, closeButtons, nameInput, bioInput, titleInput, linkInput, profileName, profileBio, popupEdit, popupNew, popupPicture, pictureTitle, pictureImage, cardsContainer, profileFormValidation, pictureFormValidation, profileFormElement, pictureFormElement};
