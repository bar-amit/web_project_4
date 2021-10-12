export default class Api {
  constructor({host, authorization}) {
    this._host = host;
    this._headers = { authorization }
    this.userId = undefined;
  }
  _handleResponse(res){
    if(res.ok)
      return res.json();
    return Promise.reject(`error: ${res.status}, ${res.statusText}`);
  }
  _handleError(error){
    console.log(error)
  }
  getUserInfo(id='me'){
    return fetch(`${this._host}/users/${id}`,{headers: this._headers})
    .then(this._handleResponse)
    .then(data => {
      this.userId = data._id;
      return data;
    })
    .catch(this._handleError)
  }
  updateUserAvatar(avatar){
    return fetch(`${this._host}/users/me/avatar`,{
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar
      })})
    .then(this._handleResponse)
    .catch(this._handleError)
  }
  getCards(){
    return fetch(`${this._host}/cards`,{headers: this._headers})
    .then(this._handleResponse)
    .catch(this._handleError)
  }
  updateUser({name,about}){
    return fetch(`${this._host}/users/me`,{
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about
      })})
    .then(this._handleResponse)
    .catch(this._handleError)
  }
  addCard({name,link}){
    return fetch(`${this._host}/cards`,{
      method: 'POST',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })})
    .then(this._handleResponse)
    .catch(this._handleError)
  }
  deleteCard(id){
    return fetch(`${host}/cards/${id}`, {method: 'DELETE', headers: this._headers})
    .then(this._handleResponse)
  }
  addLike(id){
    return fetch(`${host}/cards/likes/${id}`, {method: 'PUT', headers: this._headers})
    .then(this._handleResponse)
  }
  removeLike(id){
    return fetch(`${host}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers})
    .then(this._handleResponse)
    .catch(this._handleError)
  }
}
