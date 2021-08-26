/*
  DOM elements:
*/

const formSelector = ".popup__form";
const inputSelector = ".popup__input";
const submitButtonSelector = ".popup__save-button";
const inactiveButtonClass = "popup__save-button_disabled";
const inputErrorClass = "popup__input_error";
const errorClass = "popup__input-error_visible";

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
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
const popups = [popupEdit, popupNew, popupPicture];

// Picture
const pictureTitle = popupPicture.querySelector('.popup__picture-title');
const pictureImage = popupPicture.querySelector('.popup__picture');

// Forms
const formProfile = document.querySelector('.popup__form_name_edit-profile');
const formPlace = document.querySelector('.popup__form_name_new-place');

// Cards container
const cardsContainer = document.querySelector('.gallery__container');

// Card template
const cardTemplate = document.querySelector('.card__template').content;

/*
  Function handlers:
*/

// Delete click handler
function handleDelete(e) {
  e.stopPropagation();
  e.target.closest('.card').remove();
}

// Like click handle
function handleLike(e) {
  e.stopPropagation();
  e.target.classList.toggle('card__like-button_active');
}

// Popup open helper function
function openPopup(popupElement){
  popupElement.classList.add('popup_visible');
}

// Popup close helper function
function closePopup(popupElement){
  popupElement.classList.remove('popup_visible');
}

// Overlay click handler
function handleOverlayClick(e){
  if(e.target.classList.contains('popup')){
    closePopup(e.target);
  }
}

// Escape key handler
function handleEscapeKey(e){
  if(e.key==='Escape'){
    popups.forEach(popup=>{
      closePopup(popup);
    });
  }
}

// Edit click handler
function handleEditButtonClick(e) {
  e.stopPropagation();

  // Fill the form with current values
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;

  resetValidation(popupEdit, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  openPopup(popupEdit);
}

// Profile submit handler
function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Get the values of each field and insert new values
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupEdit);
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  titleInput.value = '';
  linkInput.value = '';

  resetValidation(popupNew, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  openPopup(popupNew);
}

// Place submit handler
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  cardsContainer.prepend(newCard({name: titleInput.value, link: linkInput.value}));

  closePopup(popupNew);
}

const handleSubmit = {
  "new-place": handlePlaceSubmit,
  "edit-profile": handleProfileSubmit
}

/*
  Cards:
*/

// Add new card to gallery
function newCard(card){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = card.name;
  cardImage.setAttribute('src',card.link);
  cardImage.setAttribute('alt',card.name);
  cardImage.addEventListener('click', getPictureEventHandler(card));
  cardLikeButton.addEventListener('click',handleLike);
  cardDeleteButton.addEventListener('click',handleDelete);

  return cardElement;
}

// Create an event handler for each new card
function getPictureEventHandler(card) {
  const handlePicture = function() {
    pictureTitle.textContent = card.name;
    pictureImage.setAttribute('src',card.link);
    pictureImage.setAttribute('alt',card.name);

    openPopup(popupPicture);
  }
  return handlePicture;
}

// Load cards
initialCards.forEach(card=>cardsContainer.append(newCard(card)));

/*
  Connect the event handlers to the elements
*/

// Keyboard events
document.addEventListener('keydown', handleEscapeKey);

// Forms
formPlace.addEventListener('submit',e=> e.preventDefault());
formProfile.addEventListener('submit',e=> e.preventDefault());

// Popups
popups.forEach(popup=>{
  popup.addEventListener('click', handleOverlayClick);
})

// Buttons
closeButtons.forEach(button=>button.addEventListener('click', function(){closePopup(button.closest('.popup'))}));
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
