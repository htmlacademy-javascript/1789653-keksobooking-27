const adForm = document.querySelector('.ad-form');
const priceElement = adForm.querySelector('#price');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const timeinElement = adForm.querySelector('#timein');
const timeoutElement = adForm.querySelector('#timeout');
const typeElement = adForm.querySelector('#type');
const submitButton = adForm.querySelector('.ad-form__submit');

let pristine = null;

const roomsToGuests = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const typesToPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

const getErrorMessageCapacity = () =>
  `Количество комнат вмещает ${roomsToGuests[roomNumberElement.value]
    .join(' или ')} гостей.`;

const getErrorMessageRoom = () =>
  `Для выбранного количества гостей требуется ${guestsToRooms[capacityElement.value]
    .join(' или ')} комнаты`;

const validateCapacity = () => {
  roomsToGuests[roomNumberElement.value]
    .includes(capacityElement.value);
};

const validePrice = (value) =>
  value >= typesToPrice[typeElement.value] && value <= typesToPrice.max;

const getErrorMessagePrice = () =>
  `Минимальная стоимость для выбранного типа жилья ${typesToPrice[typeElement.value]} руб.`;

const onRoomToggle = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onTypeToggle = () => {
  const minPrice = typesToPrice[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
};

const onPriceToggle = () =>
  pristine.validate(priceElement);

const getTimeinToggle = () => {
  timeoutElement.value = timeinElement.value;
};

const getTimeonToggle = () => {
  timeinElement.value = timeoutElement.value;
};

const formVlidation = () => {
  roomNumberElement.addEventListener('change', onRoomToggle);
  capacityElement.addEventListener('change', onRoomToggle);
  typeElement.addEventListener('change', onTypeToggle);
  priceElement.addEventListener('change', onPriceToggle);
  timeinElement.addEventListener('change', getTimeinToggle);
  timeoutElement.addEventListener('change', getTimeonToggle);

  pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__element--invalid',
  }, true);

  pristine.addValidator(
    capacityElement,
    validateCapacity,
    getErrorMessageCapacity,
  );

  pristine.addValidator(
    roomNumberElement,
    validateCapacity,
    getErrorMessageRoom,
  );

  pristine.addValidator(
    priceElement,
    validePrice,
    getErrorMessagePrice,
  );

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    submitButton.disabled = !isValid;
  });
};

formVlidation();
