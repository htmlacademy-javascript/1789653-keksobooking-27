const MIN = 0;
const MAX = 100000;
const STEP = 500;

const TYPES_TO_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

const adFormElement = document.querySelector('.ad-form');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const sliderElement = adFormElement.querySelector('.ad-form__slider');

const setPricePlaceholder = () => {
  priceElement.placeholder = TYPES_TO_PRICES[typeElement.value];
};

noUiSlider.create(sliderElement, {
  range: {
    'min': MIN,
    'max': MAX,
  },
  start: MIN,
  step: STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceElement.value = sliderElement.noUiSlider.get(true);
});

priceElement.addEventListener('input', () => {
  if (!priceElement.value) {
    sliderElement.noUiSlider.set(0);
  }
  sliderElement.noUiSlider.set(priceElement.value);
});

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export { resetSlider, setPricePlaceholder };
