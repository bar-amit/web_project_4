/*
  DOM elements:
*/

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

// Close click handler
function handleClose(e) {
  e.target.closest('.popup').classList.remove('popup_visible');
}

// Delete click handler
function handleDelete(e) {
  e.target.closest('.card').remove();
}

// Like click handle
function handleLike(e) {
  e.target.classList.toggle('card__like-button_active');
}

// Add click handler
function handleAddButtonClick() {
  popupNew.classList.add('popup_visible');
}

// Edit click handler
function handleEditButtonClick() {
  // Fill the form with current values
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;

  popupEdit.classList.add('popup_visible');
}

// Profile submit handler
function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Get the values of each field and insert new values
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  evt.target.closest('.popup').classList.remove('popup_visible');
}

// Place submit handler
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  addCard({name: titleInput.value, link: linkInput.value});

  evt.target.closest('.popup').classList.remove('popup_visible');
}

/*
  Cards:
*/

// Add new card to gallery
function addCard(card){
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

  cardsContainer.prepend(cardElement);
}

// Create an event handler for each new card
function getPictureEventHandler(card) {
  const handlePicture = function() {
    const pictureTitle = popupPicture.querySelector('.popup__picture-title');
    const pictureImage = popupPicture.querySelector('.popup__picture');

    pictureTitle.textContent = card.name;
    pictureImage.setAttribute('src',card.link);
    pictureImage.setAttribute('alt',card.name);

    popupPicture.classList.add('popup_visible');
  }
  return handlePicture;
}

// Load cards
initialCards.forEach(card=>addCard(card));

/*
  Connect the event handlers to the elements
*/

// Forms
formProfile.addEventListener('submit', handleProfileSubmit);
formPlace.addEventListener('submit', handlePlaceSubmit);

// Buttons
closeButtons.forEach(button=>button.addEventListener('click', handleClose));
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
