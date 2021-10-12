export default class UserInfo {
  constructor({userNameSelector, descriptionSelector, avatarSelector}) {
    this._nameElement = document.querySelector(userNameSelector);
    this._bioElement = document.querySelector(descriptionSelector);
    this._imageElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {name: this._nameElement.textContent, bio: this._bioElement.textContent};
  }
  setUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = about;
  }
  setUserAvatar(link){
    this._imageElement.src = link;
  }
}
