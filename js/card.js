const offerTypes = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');

const getCardList = ({ offer, author }) => {
  const getCardItem = cardTemplate.cloneNode(true);

  getCardItem.querySelector('.popup__title').textContent = offer.title;
  getCardItem.querySelector('.popup__text--address').textContent = offer.address;
  getCardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  getCardItem.querySelector('.popup__type').textContent = offerTypes[offer.type];
  getCardItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  getCardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getCardItem.querySelector('.popup__avatar').src = author.avatar;

  const popupDescription = getCardItem.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }

  if (offer.features && offer.features.length) {
    const featureContainer = getCardItem.querySelector('.popup__features');
    featureContainer.innerHTML = '';

    offer.features.forEach((item) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${item}`);

      featureContainer.append(featureElement);
    });
  }

  if (offer.photos && offer.photos.length) {
    const popupPhotos = getCardItem.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';

    offer.photos.forEach((photo) => {
      const photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;

      popupPhotos.append(photoElement);
    });
  }

  return getCardItem;
};

export { getCardList };
