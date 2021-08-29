/*
  DOM elements:
*/

// Selectors
const popupSelector = ".popup";
const popupCloseButtonSelector = ".popup__close-button";
const formSelector = ".popup__form";
const inputSelector = ".popup__input";
const submitButtonSelector = ".popup__save-button";
const cardSelector = ".card";
const cardTitleSelector = ".card__title";
const cardImageSelector = ".card__image";
const cardLikeSelector = ".card__like-button";
const cardDeleteSelector = ".card__delete-button";

// classes
const activePopupClass = "popup_visible";
const inactiveButtonClass = "popup__save-button_disabled";
const inputErrorClass = "popup__input_error";
const errorClass = "popup__input-error_visible";
const activelikeButtonClass = "card__like-button_active";

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

// Picture
const pictureTitle = popupPicture.querySelector('.popup__picture-title');
const pictureImage = popupPicture.querySelector('.popup__picture');

// Cards container
const cardsContainer = document.querySelector('.gallery__container');

// Card template
const cardTemplate = document.querySelector('.card__template').content;

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
function closeButtonHandle(e){
  closePopup(e.target.closest(popupSelector));
}

// Overlay click handler
function handleOverlayClick(e){
  if(e.target.classList.contains(popupSelector)){
    closePopup(e.target);
  }
}

// Escape key handler
function handleEscapeKey(e){
  if(e.key==='Escape'){
    closePopup(document.querySelector(`.${activePopupClass}`));
  }
}

function addPopupEvents(popupElement){
  const closeButton = popupElement.querySelector(popupCloseButtonSelector);
  const formElement = popupElement.querySelector(formSelector);

  popupElement.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeKey);
  closeButton.addEventListener('click', closeButtonHandle);

  if(formElement){
    formElement.addEventListener('submit', handleSubmit);
  }
}

function removePopupEvents(popupElement){
  const closeButton = popupElement.querySelector(popupCloseButtonSelector);
  const formElement = popupElement.querySelector(formSelector);

  popupElement.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeKey);
  closeButton.removeEventListener('click', closeButtonHandle);

  if(formElement){
    formElement.removeEventListener('submit', handleSubmit);
  }
}

/*
  Forms:
*/

// Place form data handler
function handlePlaceFormData() {
  cardsContainer.prepend(newCard({name: titleInput.value, link: linkInput.value}));

  closePopup(popupNew);
}

// Profile form data handler
function handleProfileFormData() {
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupEdit);
}

const handleFormData = {
  "new-place": handlePlaceFormData,
  "edit-profile": handleProfileFormData
}

// Form submit Handler
function handleSubmit(e){
  e.preventDefault();

  const form = e.target;

  if(!form.querySelector(`.${inactiveButtonClass}`)){
    handleFormData[form.getAttribute('name')]();
  }
}

/*
  Cards:
*/

// Add new card to gallery
function newCard(card){
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);
  const cardTitle = cardElement.querySelector(cardTitleSelector);
  const cardImage = cardElement.querySelector(cardImageSelector);

  addCardEvents(cardElement);
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src',card.link);
  cardImage.setAttribute('alt',card.name);

  return cardElement;
}

// Delete click handler
function handleDelete(e) {
  e.stopPropagation();

  const cardElement = e.target.closest(cardSelector);
  removeCardEvents(cardElement)
  cardElement.remove();
}

// Like click handler
function handleLike(e) {
  e.stopPropagation();
  e.target.classList.toggle(activelikeButtonClass);
}

// Picture click handler
function handlePictureClick(e) {
  const cardElement = e.target;

  pictureTitle.textContent = cardElement.alt;
  pictureImage.setAttribute('src', cardElement.src);
  pictureImage.setAttribute('alt', cardElement.alt);

  openPopup(popupPicture);
}

// Add card events
function addCardEvents(cardElement){
  const cardImage = cardElement.querySelector(cardImageSelector);
  const cardLikeButton = cardElement.querySelector(cardLikeSelector);
  const cardDeleteButton = cardElement.querySelector(cardDeleteSelector);

  cardImage.addEventListener('click', handlePictureClick);
  cardLikeButton.addEventListener('click',handleLike);
  cardDeleteButton.addEventListener('click',handleDelete);

}

// Remove card events
function removeCardEvents(cardElement){
  const cardImage = cardElement.querySelector(cardImageSelector);
  const cardLikeButton = cardElement.querySelector(cardLikeSelector);
  const cardDeleteButton = cardElement.querySelector(cardDeleteSelector);

  cardImage.removeEventListener('click', handlePictureClick);
  cardLikeButton.removeEventListener('click',handleLike);
  cardDeleteButton.removeEventListener('click',handleDelete);
}

// Load cards
initialCards.forEach(card=>cardsContainer.append(newCard(card)));

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

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

/*
  Validation
*/

enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
});
