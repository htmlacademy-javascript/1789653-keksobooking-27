import { countOffers } from './data.js';
import { displayMap, createMarker } from './map.js';
import { formValidation } from './validation.js';
import './slider.js';

const NUMBER_OFFERS = 10;

const FIRST_COORDINATE = {
  lat: 35.68156,
  lng: 139.78763,
};

const mapCanvas = document.querySelector('.map__canvas');
const address = document.querySelector('#address');

const offers = countOffers(NUMBER_OFFERS);
const renderFlyerMap = displayMap(mapCanvas, address, FIRST_COORDINATE);

createMarker(offers, renderFlyerMap);
formValidation();

