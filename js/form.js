const toggleFormActive = (active) => {
  const adForm = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');

  adForm.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = !active;
  });

  mapForm.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = !active;
  });

  mapForm.querySelectorAll('select').forEach((item) => {
    item.disabled = !active;
  });

  if (!active) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filter--disabled');
  }
};

export { toggleFormActive };
