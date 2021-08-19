// Let's find the buttons in the DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

// Let's find the element we want to hide and show
let popup = document.querySelector('.popup');

// Let's get the input elements in the DOM
let nameInput = document.querySelector('.popup__input_type_name');
let bioInput = document.querySelector('.popup__input_type_bio');

// Select elements where the field values will be entered
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

// Cards container
let cardsContainer = document.querySelector('.gallery__container');

// Template
let cardTemplate = document.querySelector('.card__template').content;

// Close click handler
function handleClose() {

  // Now, let's hide
  popup.classList.remove('popup_visible');
}

// Edit click handler
function handleEdit() {

  // Let's get the name's and bio's current text and fill the form
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;

  // Now, let's show to the world our popup
  popup.classList.add('popup_visible');
}

// Let's find the form in the DOM
let formElement = document.querySelector('.popup__edit-profile');

// Next is the form submit handler, though
// it won't submit anywhere just yet
function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  // Get the values of each field from the corresponding value property
  // Insert new values using the textContent property of the querySelector() method
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  // Our work here is done, why won't we close that pop-up then?
  handleClose();
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

  cardTitle.textContent = card.name;
  cardImage.setAttribute('src',card.link);
  cardImage.setAttribute('alt',card.name);

  cardsContainer.prepend(cardElement);
}

// Load cards
initialCards.forEach(card=>addCard(card));

// Connect the event handlers to the elements:
formElement.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', handleClose);
editButton.addEventListener('click', handleEdit);
