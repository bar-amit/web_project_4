export default class UserInfo {
  constructor({userNameSelector, descriptionSelector}) {
    this._nameElement = document.querySelector(userNameSelector);
    this._bioElement = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    return {name: this._nameElement.textContent, bio: this._bioElement.textContent};
  }
  setUserInfo({name,bio}) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }
}
