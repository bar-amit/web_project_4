import Card from './card.js';
import {popupSelector, activePopupClass, cardSelectors, editButton, addButton, closeButtons, nameInput, bioInput, titleInput, linkInput, profileName, profileBio, popupEdit, popupNew, popupPicture, pictureTitle, pictureImage, cardsContainer, profileFormValidation, pictureFormValidation, profileFormElement, pictureFormElement} from './vars.js'

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
