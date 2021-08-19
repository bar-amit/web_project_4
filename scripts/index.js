// Let's find the buttons in the DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');

// Let's get the input elements in the DOM
let nameInput = document.querySelector('.popup__input_type_name');
let bioInput = document.querySelector('.popup__input_type_bio');
let titleInput = document.querySelector('.popup__input_type_title');
let linkInput = document.querySelector('.popup__input_type_link');

// Select elements where the field values will be entered
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

// Popup elements
let popupEdit = document.querySelector('.popup_name_edit-profile');
let popupNew = document.querySelector('.popup_name_new-place')

// Let's find the forms in the DOM
let formProfile = document.querySelector('.popup__form_name_edit-profile');
let formPlace = document.querySelector('.popup__form_name_new-place');

// Cards container
let cardsContainer = document.querySelector('.gallery__container');

// Template
let cardTemplate = document.querySelector('.card__template').content;

// Close click handler
function handleClose(e) {

  // Now, let's hide
  e.target.closest('.popup').classList.remove('popup_visible');
}

// Add click handler
function handleAdd() {
  popupNew.classList.add('popup_visible');
}

// Like click handle
function handleLike(e) {
  e.target.classList.toggle('card__like-button_active');
}

// Edit click handler
function handleEdit() {

  // Let's get the name's and bio's current text and fill the form
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;

  // Now, let's show to the world our popup
  popupEdit.classList.add('popup_visible');
}

// Next is the form submit handler, though
// it won't submit anywhere just yet
function handleProfileSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  // Get the values of each field from the corresponding value property
  // Insert new values using the textContent property of the querySelector() method
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  // Our work here is done, why won't we close that pop-up then?
  evt.target.closest('.popup').classList.remove('popup_visible');
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();

  addCard({name: titleInput.value, link: linkInput.value});

  evt.target.closest('.popup').classList.remove('popup_visible');
}

function handleDelete(e) {
  e.target.closest('.card').remove();
}

// Cards' data:
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

function addCard(card){
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  let cardTitle = cardElement.querySelector('.card__title');
  let cardImage = cardElement.querySelector('.card__image');
  let cardLikeButton = cardElement.querySelector('.card__like-button');
  let cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = card.name;
  cardImage.setAttribute('src',card.link);
  cardImage.setAttribute('alt',card.name);
  cardLikeButton.addEventListener('click',handleLike);
  cardDeleteButton.addEventListener('click',handleDelete);

  cardsContainer.prepend(cardElement);
}

// Load cards
initialCards.forEach(card=>addCard(card));

// Connect the event handlers to the elements:
formProfile.addEventListener('submit', handleProfileSubmit);
formPlace.addEventListener('submit', handlePlaceSubmit);
closeButtons.forEach(button=>button.addEventListener('click', handleClose));
editButton.addEventListener('click', handleEdit);
addButton.addEventListener('click', handleAdd);
