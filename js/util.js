const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    const number = min;
    min = max;
    max = number;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomNumberFloat = (min, max, n = 1) => {
  if (min < 0 || max < 0 || n < 0) {
    return NaN;
  }
  if (min > max) {
    const number = min;
    min = max;
    max = number;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min) + min;
  return + result.toFixed(n);
};

const getRandomArrayElement = (array) =>
  array[getRandomNumber(0, array.length - 1)];

export { getRandomNumber, getRandomNumberFloat, getRandomArrayElement };
