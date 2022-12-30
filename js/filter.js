import { debounce, toggleFormActive } from './util.js';

const NUMBER_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const filterMapElement = document.querySelector('.map__filters');
const typeFilterElement = filterMapElement.querySelector('#housing-type');
const priceFilterElement = filterMapElement.querySelector('#housing-price');
const roomsFilterElement = filterMapElement.querySelector('#housing-rooms');
const guestsFilterElement = filterMapElement.querySelector('#housing-guests');
const featuresFilterElement = filterMapElement.querySelectorAll('.map__checkbox');

const PriceType = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filterByType = ({ offer }, selectedType) =>
  selectedType === DEFAULT_VALUE || offer.type === selectedType;

const filterByPrice = ({ offer }, selectedPrice) => {
  switch (selectedPrice) {
    case PriceType.ANY:
      return true;
    case PriceType.LOW:
      return offer.price < PriceValue.MIDDLE;
    case PriceType.MIDDLE:
      return offer.price < PriceValue.HIGH && offer.price >= PriceValue.MIDDLE;
    case PriceType.HIGH:
      return offer.price >= PriceValue.HIGH;
    default:
      throw new Error('Неизвестное значение выбранной цены');
  }
};

const filterByRooms = ({ offer }, selectedRoom) =>
  selectedRoom === DEFAULT_VALUE || offer.rooms === parseInt(selectedRoom, 10);

const filterByGuests = ({ offer }, selectedGuests) =>
  selectedGuests === DEFAULT_VALUE || offer.guests === parseInt(selectedGuests, 10);

const filterByFeatures = ({ offer }, selectedFeatures) => {
  if (selectedFeatures.length === 0) {
    return true;
  }
  if (!offer.features) {
    return false;
  }
  return selectedFeatures.every(
    (featureItem) => offer.features.includes(featureItem)
  );
};

const setFilters = (offers, isInit = false) => {

  if (isInit) {
    return offers.slice(0, NUMBER_OFFERS);
  }

  const selectedType = typeFilterElement.value;
  const selectedPrice = priceFilterElement.value;
  const selectedRoom = roomsFilterElement.value;
  const selectedGuests = guestsFilterElement.value;
  const reducedOffers = [];

  const selectedFeatures = Array
    .from(featuresFilterElement)
    .filter((featureItem) => featureItem.checked === true)
    .map((featureItem) => featureItem.value);

  for (const item of offers) {
    if (reducedOffers.length >= NUMBER_OFFERS) {
      break;
    }

    if (
      filterByType(item, selectedType) &&
      filterByPrice(item, selectedPrice) &&
      filterByRooms(item, selectedRoom) &&
      filterByGuests(item, selectedGuests) &&
      filterByFeatures(item, selectedFeatures)
    ) {
      reducedOffers.push(item);
    }
  }

  return reducedOffers;
};

const initFilters = (initialOffers, cb) => {
  cb(setFilters(initialOffers));
  filterMapElement.addEventListener('change', debounce(() => cb(setFilters(initialOffers))));

  filterMapElement.addEventListener('reset', () => {
    cb(setFilters(initialOffers, true));
  });
};

const setActiveFormMap = (active) => {
  toggleFormActive([
    {
      element: filterMapElement,
      classDisabled: 'map__filters--disabled',
    },
  ], active);
};

const resetFilter = () => filterMapElement.reset();

export { initFilters, setActiveFormMap, resetFilter };
