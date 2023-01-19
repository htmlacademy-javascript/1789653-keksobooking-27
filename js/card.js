import { countOffers } from './data.js';
import { getRandomArrayElement } from './util.js';
// import { toggleFormActive } from './form.js'; //
import './validation.js';

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('.map__canvas');

const adsList = countOffers();

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');

const getCardList = ({ author, offer }) => {
  const getCardItem = cardTemplate.cloneNode(true);

  getCardItem.querySelector('.popup__title').textContent = offer.title;
  getCardItem.querySelector('.popup__text--address').textContent = offer.address;
  getCardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  getCardItem.querySelector('.popup__type').textContent = offerTypes[offer.type];
  getCardItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  getCardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getCardItem.querySelector('.popup__description').textContent = offer.description;
  getCardItem.querySelector('.popup__avatar').src = author.avatar;

  const featureContainer = getCardItem.querySelector('.popup__features');
  featureContainer.innerHTML = '';

  offer.features.forEach((item) => {
    const featureElement = cardTemplate.querySelector('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${item}`);

    featureContainer.append(featureElement);
  });

  const popupPhotos = getCardItem.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  offer.photos.forEach((photo) => {
    const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photo;

    popupPhotos.append(photoElement);
  });

  return getCardItem;
};

const canvasMap = () => mapCanvas.append(getCardList(getRandomArrayElement(adsList)));

// toggleFormActive(); //

export { getCardList, canvasMap };
