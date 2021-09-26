class Card {
  constructor(data, assets) {

    //data
    this._name = data.name;
    this._link = data.link;

    // selectors
    this._cardSelector = assets.cardSelector;
    this._cardTemplateSelector = assets.cardTemplateSelector;
    this._cardTitleSelector = assets.cardTitleSelector;
    this._cardImageSelector = assets.cardImageSelector;
    this._cardLikeSelector = assets.cardLikeSelector;
    this._cardDeleteSelector = assets.cardDeleteSelector;

    // bound handlers:
    this._handleLike = this._handleLikeClick.bind(this);
    this._handleDelete = this._handleCardDelete.bind(this);

    this._handlePicture = assets.openPicture;

    this._activelikeButtonClass = assets.activelikeButtonClass;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
    return cardTemplate.querySelector(this._cardSelector).cloneNode(true);
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(this._cardLikeSelector);
    likeButton.classList.toggle(this._activelikeButtonClass);
  }

  _addCardEvents(){
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    const cardDeleteButton = this._element.querySelector(this._cardDeleteSelector);

    cardImage.addEventListener('click', this._handlePicture);
    cardLikeButton.addEventListener('click', this._handleLike);
    cardDeleteButton.addEventListener('click', this._handleDelete);

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
