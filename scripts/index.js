// Let's find the buttons in the DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

// Let's find the element we want to hide and show
let popup = document.querySelector('.popup');

// Let's get the input elements in the DOM
let nameInput = document.querySelector('.popup__input[name="name"]');
let bioInput = document.querySelector('.popup__input[name="bio"]');

// Select elements where the field values will be entered
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio')

// Close click handler
function handleClose() {

  // Now, let's hide
  popup.classList.remove('popup_visible');
}

// Edit click handler
function handleEdit() {

  // Let's get the name's and bio's current text
  let nameText = profileName.textContent;
  let bioText = profileBio.textContent;

  // Let's finally fill the form
  nameInput.value = nameText;
  bioInput.value = bioText;

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
  let newName = nameInput.value;
  let newBio = bioInput.value;

  // Insert new values using the textContent property of the querySelector() method
  profileName.textContent = newName;
  profileBio.textContent = newBio;

  // Our work here is done, why won't we close that pop-up then?
  handleClose();
}

// Connect the handlers to the elements:
formElement.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', handleClose);
editButton.addEventListener('click', handleEdit);
