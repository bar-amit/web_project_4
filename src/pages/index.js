// style:
import './index.css';

// components:
import Api from '../components/Api'
import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithConfirmation from '../components/PopupWithConfirmation'
import UserInfo from '../components/UserInfo';
import Section  from '../components/Section';
import Validation from '../components/Validation';
import {profileSelectors, formSelectors, cardSelectors, editButtonSelector, addButtonSelector, editAvatarButtonSelector, avatarPopupSelector, confirmPopupSelector, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, cardsContainerSelector, profileFormSelector, pictureFormSelector, avatarFormSelector, initialCards} from '../components/constants'

/*
  API:
*/

const api = new Api({host: 'https://around.nomoreparties.co/v1/group-12', authorization: '9dcb4203-ec5d-4132-a4af-e260b13cb4d2 '});

/*
  Profile:
*/

const profileView = new UserInfo(profileSelectors);

api.getUserInfo().then(data=>{
  profileView.setUserInfo(data);
  profileView.setUserAvatar(data.avatar);
});

/*
  Popups:
*/

const picturePopup = new PopupWithImage(picturePopupSelector);
const editPopup = new PopupWithForm(editProfilePopupSelector, {handleSubmit: handleProfileSubmit, resetValidation: ()=>profileFormValidator.resetValidation()});
const addPopup = new PopupWithForm(addCardPopupSelector, {handleSubmit: handlePlaceSubmit, resetValidation: ()=>pictureFormValidator.resetValidation()});
const avatarPopup = new PopupWithForm(avatarPopupSelector, {handleSubmit: handleAvatarSubmit, resetValidation: ()=>avatarFormValidator.resetValidation()});
const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, formSelectors.submitButtonSelector);

/*
  Forms:
*/

const profileFormElement = document.querySelector(profileFormSelector);
const pictureFormElement = document.querySelector(pictureFormSelector);
const avatarFormElement = document.querySelector(avatarFormSelector);

const profileFormValidator = new Validation(formSelectors, profileFormElement);
const pictureFormValidator = new Validation(formSelectors, pictureFormElement);
const avatarFormValidator = new Validation(formSelectors, avatarFormElement);

// Place form data handler
function handlePlaceSubmit(e) {
  e.preventDefault();

  const {title: name, link} = this._getInputValues();
  gallerySection.addItem({name, link});
  api.addCard({name, link});
  this.close();
}

// Profile form data handler
function handleProfileSubmit(e) {
  e.preventDefault();

  const {name, bio: about} = this._getInputValues();
  profileView.setUserInfo({name, about})
  api.updateUser({name, about});
  this.close();
}

// Avatar form submit
function handleAvatarSubmit(e){
  e.preventDefault();

  const {url} = this._getInputValues();

  api.updateUserAvatar(url);
  profileView.setUserAvatar(url);
  this.close();
}

/*
  Cards:
*/

const gallerySection = new Section({items: initialCards, renderer: addNewCard}, cardsContainerSelector);
gallerySection.renderItems();

function addNewCard(data){
  const newCard = new Card(data, {...cardSelectors, openPicture: () => picturePopup.open(data)}, confirmPopup.open);
  return newCard.generateCard();
}

/*
  Page Buttons:
*/

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);
const avatarButton = document.querySelector(editAvatarButtonSelector);

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
avatarButton.addEventListener('click', handleEditAvatarClick);

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

// Avatar click handler
function handleEditAvatarClick(e){
  e.stopPropagation();

  avatarPopup.open({});
}

/*
  Validation:
*/

profileFormValidator.enableValidation();
pictureFormValidator.enableValidation();
avatarFormValidator.enableValidation();
