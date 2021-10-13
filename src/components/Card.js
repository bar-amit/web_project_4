class Card {
  constructor({name, link, likes, liked}, assets, confirmDelete, {addLike, removeLike, deleteCard, handleError}) {

    //data
    this._name = name;
    this._link = link;
    this._likeCount = likes.length;
    this._isliked = liked;

    // selectors
    this._cardSelector = assets.cardSelector;
    this._cardTemplateSelector = assets.cardTemplateSelector;
    this._cardTitleSelector = assets.cardTitleSelector;
    this._cardImageSelector = assets.cardImageSelector;
    this._cardLikeSelector = assets.cardLikeSelector;
    this._cardLikesCounterSelector = assets.cardLikeCounterSelector;
    this._cardDeleteSelector = assets.cardDeleteSelector;

    // bound handlers:
    this._handleLike = this._handleLikeClick.bind(this);
    this._handleDelete = this._handleCardDelete.bind(this);

    this._handlePicture = assets.openPicture;
    this._confirm = confirmDelete;
    this._addLikeApi = addLike;
    this._removeLikeApi = removeLike;
    this._deleteCardApi = deleteCard;
    this._handleError = handleError;

    this._activeLikeButtonClass = assets.activeLikeButtonClass;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
    return cardTemplate.querySelector(this._cardSelector).cloneNode(true);
  }

  _handleCardDelete() {
    this._confirm(() =>{
      this._deleteCardApi()
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch(this._handleError);
    })
  }

  _updateLikes = (data) => {
    const likeButton = this._element.querySelector(this._cardLikeSelector);
    likeButton.classList.toggle(this._activeLikeButtonClass);
    this._isliked = !this._isliked;
    this._likeCount = data.likes.length;
    this._element.querySelector(this._cardLikesCounterSelector).textContent = `${this._likeCount}`;
  }

  _handleLikeClick() {
    if(this._isliked){
      this._removeLikeApi()
      .then(this._updateLikes)
      .catch(this._handleError);
    }
    else {
      this._addLikeApi()
      .then(this._updateLikes)
      .catch(this._handleError);
    }
  }

  _addCardEvents(isCardOwner){
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    const cardDeleteButton = this._element.querySelector(this._cardDeleteSelector);

    if(isCardOwner){
      cardDeleteButton.addEventListener('click', this._handleDelete);
    }
    else {
      cardDeleteButton.remove();
    }

    cardImage.addEventListener('click', this._handlePicture);
    cardLikeButton.addEventListener('click', this._handleLike);
  }

  generateCard(isCardOwner=false){
    this._element = this._getTemplate();

    this._addCardEvents(isCardOwner);
    this._element.querySelector(this._cardTitleSelector).textContent = this._name;
    this._element.querySelector(this._cardLikesCounterSelector).textContent = this._likeCount;
    if(this._isliked)
      this._element.querySelector(this._cardLikeSelector).classList.add(this._activeLikeButtonClass);
    const image = this._element.querySelector(this._cardImageSelector);
    image.src = this._link;
    image.alt = this._name;

    return this._element;
  }
}

export default Card;
