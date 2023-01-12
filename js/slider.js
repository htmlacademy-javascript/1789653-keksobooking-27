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

const getNumberPrice = () =>
  parseFloat(TYPES_TO_PRICES[typeElement.value]);

noUiSlider.create(sliderElement, {
  start: getNumberPrice(),
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

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

const priceChangeElement = () => {
  priceElement.placeholder = TYPES_TO_PRICES[typeElement.value];
};

const priceInputElement = () => {
  priceElement.addEventListener('input', (evt) => {
    sliderElement.noUiSlider.updateOptions({
      start: evt.target.value || getNumberPrice(),
      range: {
        min: getNumberPrice(),
        max: MAX,
      },
    });

    if (priceElement.value === '') {
      priceChangeElement();
      typeElement.addEventListener('change', () => {
        priceChangeElement();
      });
    }
  });
};

export { resetSlider, priceInputElement };
