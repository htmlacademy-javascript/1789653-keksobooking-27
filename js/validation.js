const adForm = document.querySelector('.ad-form');
const priceElement = adForm.querySelector('#price');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const timeinElement = adForm.querySelector('#timein');
const timeoutElement = adForm.querySelector('#timeout');
const typeElement = adForm.querySelector('#type');
const submitButton = adForm.querySelector('.ad-form__submit');

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

const validateCapacity = () =>
  ROOMS_TO_GUESTS[roomNumberElement.value]
    .includes(capacityElement.value);

const validePrice = (value) =>
  value >= TYPES_TO_PRICES[typeElement.value] && value <= TYPES_TO_PRICES.max;

const getErrorMessagePrice = () =>
  `Минимальная стоимость для выбранного типа жилья ${TYPES_TO_PRICES[typeElement.value]} руб.`;

const onCapacityToggle = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onTypeToggle = () => {
  const minPrice = TYPES_TO_PRICES[typeElement.value];
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  pristine.validate(priceElement);
};

const onPriceToggle = () =>
  pristine.validate(priceElement);

const onTimeinToggle = () => {
  timeoutElement.value = timeinElement.value;
};

const onTimeonToggle = () => {
  timeinElement.value = timeoutElement.value;
};

const formValidation = () => {
  roomNumberElement.addEventListener('change', onCapacityToggle);
  capacityElement.addEventListener('change', onCapacityToggle);
  typeElement.addEventListener('change', onTypeToggle);
  priceElement.addEventListener('change', onPriceToggle);
  timeinElement.addEventListener('change', onTimeinToggle);
  timeoutElement.addEventListener('change', onTimeonToggle);

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

export { formValidation };
