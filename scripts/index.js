import Card from './card.js';

/*
  DOM elements:
*/

// Selectors
const popupSelector = ".popup";
const formSelector = ".popup__form";
const inputSelector = ".popup__input";
const submitButtonSelector = ".popup__save-button";
const cardSelectors = {
  cardSelector: ".card",
  cardTemplateSelector: ".card__template",
  cardTitleSelector: ".card__title",
  cardImageSelector: ".card__image",
  cardLikeSelector: ".card__like-button",
  cardDeleteSelector: ".card__delete-button",
  activelikeButtonClass: "card__like-button_active"
}

// classes
const activePopupClass = "popup_visible";
const inactiveButtonClass = "popup__save-button_disabled";
const inputErrorClass = "popup__input_error";
const errorClass = "popup__input-error_visible";

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

// Cards container
const cardsContainer = document.querySelector('.gallery__container');

/*
  Popups:
*/

// Popup open helper function
function openPopup(popupElement){
  addPopupEvents(popupElement)
  popupElement.classList.add(activePopupClass);
}

// Popup close helper function
function closePopup(popupElement){
  removePopupEvents(popupElement);
  popupElement.classList.remove(activePopupClass);
}

// Close click handler
function handleCloseButtonClick(e){
  closePopup(e.target.closest(popupSelector));
}

// Overlay click handler
function handleOverlayClick(e){
  if(e.target.classList.contains(activePopupClass)){
    closePopup(e.target);
  }
}

// Escape key handler
function handleEscapeKey(e){
  if(e.key==='Escape'){
    closePopup(document.querySelector(`.${activePopupClass}`));
  }
}

// Add popup events
function addPopupEvents(popupElement){
  popupElement.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeKey);
}

// Remove popup events
function removePopupEvents(popupElement){
  popupElement.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeKey);
}

/*
  Forms:
*/

// Place form data handler
function handlePlaceSubmit(e) {
  e.preventDefault();

  const data = {name: titleInput.value, link: linkInput.value};
  addNewCard(data);

  closePopup(popupNew);
}

// Profile form data handler
function handleProfileSubmit(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupEdit);
}

/*
  Cards:
*/

function addNewCard(data){
  const newCard = new Card(data, cardSelectors, {openPopup, closePopup});
  cardsContainer.prepend(newCard.generateCard());
}

// Load cards
initialCards.forEach(data=>{
  addNewCard(data);
});

/*
  Page Buttons:
*/

// Edit click handler
function handleEditButtonClick(e) {
  e.stopPropagation();

  // Fill the form with current values
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;

  resetValidation(popupEdit, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  openPopup(popupEdit);
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  titleInput.value = '';
  linkInput.value = '';

  resetValidation(popupNew, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  openPopup(popupNew);
}

/*
  Events:
*/

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

closeButtons.forEach(button => button.addEventListener('click', handleCloseButtonClick));

profileFormElement.addEventListener('submit', handleProfileSubmit);
pictureFormElement.addEventListener('submit', handlePlaceSubmit);

/*
  Validation:
*/

enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
});
