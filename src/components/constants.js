/*
  DOM elements:
*/

// Forms
const profileFormSelector = '.form_name_edit-profile';
const pictureFormSelector = '.form_name_new-place';
const avatarFormSelector = '.form_name_edit-avatar';
const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__input-error_visible"
}

// Buttons
const editButtonSelector = '.profile__edit-button';
const addButtonSelector = '.profile__add-button';
const editAvatarButtonSelector = '.profile__avatar';

// Profile
const profileSelectors = {
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__bio',
  avatarSelector: '.profile__image'
};

// Popups
const editProfilePopupSelector = '.popup_name_edit-profile';
const addCardPopupSelector = '.popup_name_new-place';
const picturePopupSelector = '.popup_name_picture';
const avatarPopupSelector = '.popup_name_edit-avatar';
const confirmPopupSelector = '.popup_name_confirm';

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
  cardLikeCounterSelector: ".card__like-counter",
  cardDeleteSelector: ".card__delete-button",
  activeLikeButtonClass: "card__like-button_active"
}
const cardsContainerSelector = '.gallery__container';

/*
  Api:
*/
const apiKey = {
  host: process.env.HOST,
  token: process.env.TOKEN
}

export {apiKey, formSelectors, activePopupClass, cardSelectors, editButtonSelector, addButtonSelector, editAvatarButtonSelector, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, avatarPopupSelector, confirmPopupSelector, cardsContainerSelector, profileFormSelector, pictureFormSelector, avatarFormSelector, popupCloseButtonSelector, popupTitleSelector, popupImageSelector, profileSelectors};
