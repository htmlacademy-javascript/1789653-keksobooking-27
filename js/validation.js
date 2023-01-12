const adFormElement = document.querySelector('.ad-form');
const priceElement = adFormElement.querySelector('#price');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const timeinElement = adFormElement.querySelector('#timein');
const timeoutElement = adFormElement.querySelector('#timeout');
const typeElement = adFormElement.querySelector('#type');

const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const GUEST_TO_ROOMS = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const TYPES_TO_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

let pristine = null;

const getErrorMessageCapacity = () =>
  `Количество комнат вмещает ${ROOMS_TO_GUESTS[roomNumberElement.value]
    .join(' или ')} ${(roomNumberElement.value === '1') ? 'гостя' : 'гостей'}.`;

const getErrorMessageRoom = () =>
  `Для выбранного количества гостей требуется ${GUEST_TO_ROOMS[capacityElement.value]
    .join(' или ')} комнаты`;

const getErrorMessagePrice = () =>
  `Минимальная стоимость для выбранного типа жилья ${TYPES_TO_PRICES[typeElement.value]} руб.`;

const validateCapacity = () =>
  ROOMS_TO_GUESTS[roomNumberElement.value]
    .includes(capacityElement.value);

const validePrice = (value) =>
  value >= TYPES_TO_PRICES[typeElement.value] && value <= TYPES_TO_PRICES.max;

const onCapacityChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onTypeChange = () => {
  pristine.validate(priceElement);
};

const onPriceChange = () => {
  pristine.validate(priceElement);
};

const onTimeinChange = () => {
  timeoutElement.value = timeinElement.value;
};

const onTimeonChange = () => {
  timeinElement.value = timeoutElement.value;
};

const renderOfferFormValidator = () => {
  roomNumberElement.addEventListener('change', onCapacityChange);
  capacityElement.addEventListener('change', onCapacityChange);
  typeElement.addEventListener('change', onTypeChange);
  priceElement.addEventListener('change', onPriceChange);
  timeinElement.addEventListener('change', onTimeinChange);
  timeoutElement.addEventListener('change', onTimeonChange);

  pristine = new Pristine(adFormElement, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
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
};

const validateForm = () => pristine.validate();

export { renderOfferFormValidator, validateForm };
