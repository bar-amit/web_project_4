import './index.css';
import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import Section  from '../components/Section';
import Validation from '../components/Validation';
import {profileSelectors, formSelectors, cardSelectors, editButton, addButton, editProfilePopupSelector, addCardPopupSelector, picturePopupSelector, cardsContainerSelector, profileFormElement, pictureFormElement, initialCards} from '../components/Constants'

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

const profileFormValidation = new Validation(formSelectors, profileFormElement);
const pictureFormValidation = new Validation(formSelectors, pictureFormElement);

// Place form data handler
function handlePlaceSubmit(e) {
  e.preventDefault();

  this._getInputValues();
  gallerySection.addItem({name: this._values[0], link: this._values[1]});

  this.close();
}

// Profile form data handler
function handleProfileSubmit(e) {
  e.preventDefault();

  this._getInputValues();
  profileView.setUserInfo({name: this._values[0], bio: this._values[1]})

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

// Edit click handler
function handleEditButtonClick(e) {
  e.stopPropagation();

  profileFormValidation.resetValidation();

  const info = profileView.getUserInfo();
  editPopup.open([info.name, info.bio]);
}

// Add click handler
function handleAddButtonClick(e) {
  e.stopPropagation();

  pictureFormValidation.resetValidation();

  addPopup.open([]);
}

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

/*
  Validation:
*/

profileFormValidation.enableValidation();
pictureFormValidation.enableValidation();
