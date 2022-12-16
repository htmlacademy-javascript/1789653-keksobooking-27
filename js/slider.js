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

const adForm = document.querySelector('.ad-form');
const typeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  start: TYPES_TO_PRICES[typeElement.value],
  step: STEP,
  connect: 'lower',
  range: {
    'min': MIN,
    'max': MAX,
  },
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

typeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN,
      max: MAX,
    },
    start: TYPES_TO_PRICES[typeElement.value],
  });
});
