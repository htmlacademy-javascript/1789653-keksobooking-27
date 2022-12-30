import { showSuccess, showError } from './message.js';
import { toggleFormActive } from './util.js';
import { postData } from './api.js';
import { resetPreview } from './picture.js';
import { resetFilter } from './filter.js';
import { resetSlider } from './slider.js';

const FLOAT_COORDINATE = 5;

const adFormElement = document.querySelector('.ad-form');
const addressElement = adFormElement.querySelector('#address');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  adFormElement.reset();
  resetPreview();
  resetFilter();
  resetSlider();
};

const setActiveAdForm = (active) => {
  toggleFormActive([
    {
      element: adFormElement,
      classDisabled: 'ad-form--disabled',
    },
  ], active);
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
    blockSubmitButton();
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
    unBlockSubmitButton();
  });
};

export { setActiveAdForm, setAddressValue, initForm };
