import { isEscapeKey, showAlert } from './util.js';
import { setAddressValue } from './form.js';

const FIRST_COORDINATE = {
  lat: 35.68156,
  lng: 139.78763,
};

const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const messageRemoveElement = () => successTemplate.remove() || errorTemplate.remove();

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bodyElement.classList.remove('modal-open');
    messageRemoveElement();
    setAddressValue(FIRST_COORDINATE);
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const closeMessage = () => {
  bodyElement.classList.remove('modal-open');
  messageRemoveElement();
  setAddressValue(FIRST_COORDINATE);

  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', closeMessage);
};

const showSuccess = () => {
  bodyElement.append(successTemplate);
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', closeMessage);

};

const showError = () => {
  bodyElement.append(errorTemplate);
  bodyElement.classList.add('modal-open');
  showAlert('Не удалось отправить файл! Попрбуйти ещё раз!');

  document.addEventListener('keydown', onEscKeydown);
  errorTemplate.addEventListener('click', closeMessage);
};

export { showSuccess, showError };
