import './slider.js';
import './message.js';
import './picture.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { initFilters, setActiveFormMap } from './filter.js';
import { renderMarkers, displayMap } from './map.js';
import { renderOfferFormValidator, validateForm } from './validation.js';
import { setActiveAdForm, setAddressValue, initForm } from './form.js';

const FIRST_COORDINATE = {
  lat: 35.68156,
  lng: 139.78763,
};

const bootstrap = async () => {
  const mapCanvas = document.querySelector('.map__canvas');
  setActiveFormMap(false);
  setActiveAdForm(false);

  renderOfferFormValidator();

  const { map, mainPinMarker } = displayMap(
    mapCanvas,
    FIRST_COORDINATE,
    () => {
      setActiveAdForm(true);
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

    setActiveFormMap(true);
    initFilters(offers, (reduceOffers) => renderMarkers(map, reduceOffers));
  }

  catch (error) {
    showAlert('ОЙ... Что-то пошло не так! Попробуйте перезагрузить страницу!');
  }
};

bootstrap();
