const ALERT_SHOW_TIME = 5000;
const TIME_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '250px';
  alertContainer.style.top = '5px';
  alertContainer.style.right = '250px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.lineHeight = 'normal';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '10px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (cb) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), TIME_DELAY);
  };
};

const toggleFormActive = (forms, active) => {
  forms.forEach(({ element, classDisabled }) => {
    if (!active) {
      element.classList.add(classDisabled);
    } else {
      element.classList.remove(classDisabled);
    }
    Array.from(element.children)
      .forEach((item) => {
        item.disabled = !active;
      });
  });
};

export { isEscapeKey, showAlert, debounce, toggleFormActive };
