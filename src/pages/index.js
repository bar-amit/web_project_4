import './index.css';
import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import Section  from '../components/Section';
import Validation from '../components/Validation';
import {profileSelectors, formSelectors, cardSelectors, editButtonSelector, addButtonSelector, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, cardsContainerSelector, profileFormSelector, pictureFormSelector, initialCards} from '../components/constants'

/*
  Profile:
*/

const profileView = new UserInfo(profileSelectors);

/*
  Popups:
*/

const picturePopup = new PopupWithImage(picturePopupSelector);
const editPopup = new PopupWithForm(editProfilePopupSelector, handleProfileSubmit);
const addPopup = new PopupWithForm(addCardPopupSelector, handlePlaceSubmit);


/*
  Forms:
*/

const profileFormElement = document.querySelector(profileFormSelector);
const pictureFormElement = document.querySelector(pictureFormSelector);

const profileFormValidation = new Validation(formSelectors, profileFormElement);
const pictureFormValidation = new Validation(formSelectors, pictureFormElement);

// Place form data handler
function handlePlaceSubmit(e) {
  e.preventDefault();

  const {title: name, link} = this._getInputValues();
  gallerySection.addItem({name, link});

  this.close();
}

// Profile form data handler
function handleProfileSubmit(e) {
  e.preventDefault();

  const {name, bio} = this._getInputValues();
  profileView.setUserInfo({name, bio})

  this.close();
}

/*
  Cards:
*/

const gallerySection = new Section({items: initialCards, renderer: addNewCard}, cardsContainerSelector);
gallerySection.renderItems();

function addNewCard(data){
  const newCard = new Card(data, {...cardSelectors, openPicture: () => picturePopup.open(data)});
  return newCard.generateCard();
}

/*
  Page Buttons:
*/

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

// Edit click handler
function handleEditButtonClick(e) {
  e.stopPropagation();

  profileFormValidation.resetValidation();

  const {name, bio} = profileView.getUserInfo();
  editPopup.open({name, bio});
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  pictureFormValidation.resetValidation();

  addPopup.open({});
}

/*
  Validation:
*/

profileFormValidation.enableValidation();
pictureFormValidation.enableValidation();
