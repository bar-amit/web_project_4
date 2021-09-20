/*
  Picture Popup
*/

const popupPicture = document.querySelector('.popup_name_picture');
const pictureTitle = popupPicture.querySelector('.popup__picture-title');
const pictureImage = popupPicture.querySelector('.popup__picture');

/*
  Card Class
*/

class Card {
  constructor(data, selectors, popupFunctions) {

    //data
    this._name = data.name;
    this._link = data.link;

    // selectors
    this._cardSelector = selectors.cardSelector;
    this._cardTemplateSelector = selectors.cardTemplateSelector;
    this._cardTitleSelector = selectors.cardTitleSelector;
    this._cardImageSelector = selectors.cardImageSelector;
    this._cardLikeSelector = selectors.cardLikeSelector;
    this._cardDeleteSelector = selectors.cardDeleteSelector;

    // bound handlers:
    this._handleLike = this._handleLikeClick.bind(this);
    this._handleDelete = this._handleCardDelete.bind(this);
    this._handlePicture = this._handlePictureClick.bind(this);

    this._activelikeButtonClass = selectors.activelikeButtonClass;

    this._openPopup = () => popupFunctions.openPopup(popupPicture);
    this._closePopup = () => popupFunctions.closePopup(popupPicture);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
    return cardTemplate.querySelector(this._cardSelector).cloneNode(true);
  }

  _handleCardDelete() {
    this._removeCardEvents();
    this._element.remove();
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(this._cardLikeSelector);
    likeButton.classList.toggle(this._activelikeButtonClass);
  }

  _handlePictureClick() {
    pictureTitle.textContent = this._name;
    pictureImage.setAttribute('src', this._link);
    pictureImage.setAttribute('alt', this._name);

    this._openPopup();
  }

  _addCardEvents(){
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    const cardDeleteButton = this._element.querySelector(this._cardDeleteSelector);

    cardImage.addEventListener('click', this._handlePicture);
    cardLikeButton.addEventListener('click', this._handleLike);
    cardDeleteButton.addEventListener('click', this._handleDelete);

  }

  _removeCardEvents(){
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    const cardDeleteButton = this._element.querySelector(this._cardDeleteSelector);

    cardImage.removeEventListener('click', this._handlePicture);
    cardLikeButton.removeEventListener('click', this._handleLike);
    cardDeleteButton.removeEventListener('click', this._handleDelete);
  }

  generateCard(){
    this._element = this._getTemplate();

    this._addCardEvents();
    this._element.querySelector(this._cardTitleSelector).textContent = this._name;
    const img = this._element.querySelector(this._cardImageSelector);
    img.src = this._link;
    img.alt = this._name;

    return this._element;
  }
}

export default Card;