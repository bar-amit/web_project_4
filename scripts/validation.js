function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
    const formElements = document.querySelectorAll(formSelector);
    Array.from(formElements).forEach(form=>{
      const inputElements = form.querySelectorAll(inputSelector);
      const buttonElement = form.querySelector(submitButtonSelector);

      setEventListeners(inputElements, buttonElement, inactiveButtonClass, inputErrorClass, errorClass);
    });
}

function setEventListeners(inputElements, buttonElement, inactiveButtonClass, inputErrorClass, errorClass){
  Array.from(inputElements).forEach(input => {
    input.addEventListener('input', function(e){
      isValid(e.target,e.target.nextElementSibling,errorClass,inputErrorClass);
      setButtonState(inputElements, buttonElement, inactiveButtonClass);
    })
  });
}

function setButtonState(inputElements, buttonElement, inactiveButtonClass){
  if(hasInvalidInput(inputElements)){
    disableButton(buttonElement,inactiveButtonClass);
  }
  else{
    enableButton(buttonElement,inactiveButtonClass);
  }
}

function hasInvalidInput(inputs){
  return Array.from(inputs).some(input=>!input.validity.valid);
}

function disableButton(button, inactiveClass){
  button.classList.add(inactiveClass);
}

function enableButton(button, inactiveClass){
  button.classList.remove(inactiveClass);
}

function isValid(input, error, visibleErrorClass, inputErrorClass){
  if(input.validity.valid){
    hideError(error,visibleErrorClass,input,inputErrorClass);
  }
  else{
    showError(error,visibleErrorClass,input.validationMessage,input,inputErrorClass);
  }
}

function hideError(error,visibleClass,input,inputErrorClass){
  error.textContent = '';
  error.classList.remove(visibleClass);
  input.classList.remove(inputErrorClass);
}

function showError(error,visibleClass,errorMessage,input,inputErrorClass){
  error.textContent = errorMessage;
  error.classList.add(visibleClass);
  input.classList.add(inputErrorClass);
}

function resetValidation(formElement, inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass, errorClass){
  const inputs = formElement.querySelectorAll(inputSelector);
  Array.from(inputs).forEach(input=>{
    hideError(input.nextElementSibling,errorClass,input,inputErrorClass);
  });
  disableButton(formElement.querySelector(buttonSelector), inactiveButtonClass);
}
