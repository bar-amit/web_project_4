/*
  Data:
*/

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


/*
  DOM elements:
*/

// Forms
const profileFormElement = document.querySelector('.popup__form_name_edit-profile');
const pictureFormElement = document.querySelector('.popup__form_name_new-place');
const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_visible"
}

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Profile
const profileSelectors = {
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__bio'
};

// Popups
const editProfilePopupSelector = '.popup_name_edit-profile';
const addCardPopupSelector = '.popup_name_new-place';
const picturePopupSelector = '.popup_name_picture';
const activePopupClass = "popup_visible";
const popupCloseButtonSelector = '.popup__close-button';
const popupTitleSelector = '.popup__picture-title';
const popupImageSelector = '.popup__picture';


// Cards
const cardSelectors = {
  cardSelector: ".card",
  cardTemplateSelector: ".card__template",
  cardTitleSelector: ".card__title",
  cardImageSelector: ".card__image",
  cardLikeSelector: ".card__like-button",
  cardDeleteSelector: ".card__delete-button",
  activeLikeButtonClass: "card__like-button_active"
}
const cardsContainerSelector = '.gallery__container';

export {formSelectors, activePopupClass, cardSelectors, editButton, addButton, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, cardsContainerSelector, profileFormElement, pictureFormElement, initialCards, popupCloseButtonSelector, popupTitleSelector, popupImageSelector, profileSelectors};
