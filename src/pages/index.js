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
import {apiKey, profileSelectors, formSelectors, cardSelectors, editButtonSelector, addButtonSelector, editAvatarButtonSelector, avatarPopupSelector, confirmPopupSelector, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, cardsContainerSelector, profileFormSelector, pictureFormSelector, avatarFormSelector} from '../components/constants'

/*
  API:
*/

const api = new Api({host: apiKey.host, authorization: apiKey.token});

/*
  Profile:
*/

const profileView = new UserInfo(profileSelectors);

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

  this.toggleButtonText();

  const {title: name, link} = this._getInputValues();
  api.addCard({name, link}).then(data => gallerySection.addItem(data))
  .then(() => {
    this.close();
    this.toggleButtonText();
  });
}

// Profile form data handler
function handleProfileSubmit(e) {
  e.preventDefault();

  this.toggleButtonText();

  const {name, bio: about} = this._getInputValues();
  profileView.setUserInfo({name, about})
  api.updateUser({name, about})
  .then(() => {
    this.close();
    this.toggleButtonText();
  });
}

// Avatar form submit
function handleAvatarSubmit(e){
  e.preventDefault();

  this.toggleButtonText();

  const {url} = this._getInputValues();

  profileView.setUserAvatar(url);
  api.updateUserAvatar(url)
  .then(() => {
    this.close();
    this.toggleButtonText();
  });
}

/*
  Cards:
*/

const gallerySection = new Section(addNewCard, cardsContainerSelector);

function getCardsFromApi(cards){
  gallerySection.renderItems(cards.reverse());
}

function addNewCard(data){
  const cardApiFunctions = {
    addLike: () => api.addLike(data._id),
    removeLike: () => api.removeLike(data._id),
    deleteCard: () => api.deleteCard(data._id)
  }

  const newCard = new Card({...data, liked: data.likes.some(obj=>obj._id===api.userId)}, {...cardSelectors, openPicture: () => picturePopup.open(data)}, confirmPopup.open, cardApiFunctions);
  return newCard.generateCard(data.owner._id===api.userId);
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

/*
  Load initial Api data:
*/

api.getUserInfo().then(data=>{
  profileView.setUserInfo(data);
  profileView.setUserAvatar(data.avatar);
})
.then(() =>
  api.getCards()
  .then(getCardsFromApi)
  );
