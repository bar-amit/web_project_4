import Card from './card.js';
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

function handlePictureClick(data) {
  pictureTitle.textContent = data.name;
  pictureImage.setAttribute('src', data.link);
  pictureImage.setAttribute('alt', data.name);

  openPopup(popupPicture);
}

function addNewCard(data){
  const newCard = new Card(data, {...cardSelectors, openPicture: () => handlePictureClick(data)});
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

  profileFormValidation.resetValidation();
  openPopup(popupEdit);
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  titleInput.value = '';
  linkInput.value = '';

  pictureFormValidation.resetValidation();
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

profileFormValidation.enableValidation();
pictureFormValidation.enableValidation();
