import { showSuccess, showError } from './message.js';
import { postData } from './api.js';
import { resetPreview } from './picture.js';
import { resetFilter } from './filter.js';
import { resetSlider } from './slider.js';

const FLOAT_COORDINATE = 5;

const adFormElement = document.querySelector('.ad-form');
const addressElement = adFormElement.querySelector('#address');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

const disableUploadButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const enableUploadButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  adFormElement.reset();
  resetPreview();
  resetFilter();
  resetSlider();
};

const setAddressValue = ({ lat, lng }) => {
  addressElement.value = `${lat.toFixed(FLOAT_COORDINATE)} ${lng.toFixed(FLOAT_COORDINATE)}`;
};

const initForm = (clearMapCb, validateFormCb) => {
  addressElement.readOnly = true;

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    clearMapCb();
  });

  adFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!validateFormCb()) {
      return;
    }
    disableUploadButton();
    const formData = new FormData(evt.target);

    try {
      await postData(formData);
      showSuccess();
      clearMapCb();
      resetForm();
    }
    catch (error) {
      showError(error.message);
    }

    enableUploadButton();
  });
};

export { setAddressValue, initForm };
