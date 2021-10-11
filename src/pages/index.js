// style:
import './index.css';

// components:
import Api from '../components/Api'
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
const editPopup = new PopupWithForm(editProfilePopupSelector, {handleSubmit: handleProfileSubmit, resetValidation: () => profileFormValidator.resetValidation()});
const addPopup = new PopupWithForm(addCardPopupSelector, {handleSubmit: handlePlaceSubmit, resetValidation: () => pictureFormValidator.resetValidation()});


/*
  Forms:
*/

const profileFormElement = document.querySelector(profileFormSelector);
const pictureFormElement = document.querySelector(pictureFormSelector);

const profileFormValidator = new Validation(formSelectors, profileFormElement);
const pictureFormValidator = new Validation(formSelectors, pictureFormElement);

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

  const {name, bio} = profileView.getUserInfo();
  editPopup.open({name, bio});
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  addPopup.open({});
}

/*
  Validation:
*/

profileFormValidator.enableValidation();
pictureFormValidator.enableValidation();
