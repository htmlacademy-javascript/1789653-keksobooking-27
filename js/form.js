const FLOAT_COORDINATE = 5;

const toggleFormActive = (forms, active) => {
  forms.forEach(({ element, classDisablebed }) => {
    if (!active) {
      element.classList.add(classDisablebed);
    } else {
      element.classList.remove(classDisablebed);
    }
    Array.from(element.children)
      .forEach((item) => {
        item.disabled = !active;
      });
  });
};

const setActiveAdForm = (active) => {
  toggleFormActive([
    {
      element: document.querySelector('.ad-form'),
      classDisabled: 'ad-form--disabled',
    },
    {
      element: document.querySelector('.map__filters'),
      classDisablebed: 'map__filters--disabled',
    },
  ], active);
};

const getAddress = (addressElement, { lat, lng }) => {
  addressElement.value = `${lat.toFixed(FLOAT_COORDINATE)} ${lng.toFixed(FLOAT_COORDINATE)}`;
  addressElement.disabled = true;
};

export { setActiveAdForm, getAddress };
