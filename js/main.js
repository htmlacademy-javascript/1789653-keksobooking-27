import { renderMarkers, displayMap } from './map.js';
import { initFilters } from './filter.js';
import { avatarChangeElement, imageChangeElement } from './picture.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { renderOfferFormValidator, validateForm } from './validation.js';
import { setAddressValue, initForm } from './form.js';

const FIRST_COORDINATE = {
  lat: 35.68156,
  lng: 139.78763,
};

const mapFilterElement = document.querySelector('.map__filters-container');
const adFormElement = document.querySelector('.ad-form');

const createBootstrap = async () => {
  const mapCanvas = document.querySelector('.map__canvas');

  renderOfferFormValidator();

  const { map, mainPinMarker } = displayMap(
    mapCanvas,
    FIRST_COORDINATE,
    () => {
      mapFilterElement.classList.remove('map__filters--disabled');
      adFormElement.classList.remove('ad-form--disabled');
      setAddressValue(FIRST_COORDINATE);
    },
    ({ target }) => setAddressValue(target.getLatLng())
  );

  try {
    const offers = await getData();
    initForm(() => {
      mainPinMarker.setLatLng(FIRST_COORDINATE);
      map.setView(FIRST_COORDINATE, 10);
      setAddressValue(FIRST_COORDINATE);
    }, validateForm);

    initFilters(offers, (reduceOffers) => renderMarkers(map, reduceOffers));
  }
  catch {
    showAlert('ОЙ... Что-то пошло не так! Попробуйте перезагрузить страницу!');
  }
};

createBootstrap();
avatarChangeElement();
imageChangeElement();
