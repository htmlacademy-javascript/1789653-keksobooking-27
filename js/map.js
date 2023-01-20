import { getCardList } from './card.js';

const ZOOM = 10;

const DEFAYLT_PIN_PATH = './img/pin.svg';
const DEFAYLT_PIN_ICON_SIZE = [40, 40];
const DEFAULT_PIT_ANCHOR_SIZE = [20, 40];

const MAIN_PIN_PATH = './img/main-pin.svg';
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];

const TILE_LAYER_LINK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ICON_TYPE = {
  MAIN: 'main',
  DEFAULT: 'default',
};

const createPinMarcer = (iconType) => {
  switch (iconType) {
    case (ICON_TYPE.DEFAULT):
      return L.icon({
        iconUrl: DEFAYLT_PIN_PATH,
        iconSize: DEFAYLT_PIN_ICON_SIZE,
        iconAnchor: DEFAULT_PIT_ANCHOR_SIZE,
      });
    case (ICON_TYPE.MAIN):
      return L.icon({
        iconUrl: MAIN_PIN_PATH,
        iconSize: MAIN_PIN_ICON_SIZE,
        iconAnchor: MAIN_PIN_ANCHOR_SIZE,
      });

    default:
      throw new Error('Неизвестный тип значка pin-кода');
  }
};

const createMarker = (location, iconType, isDraggable = false) => {
  const { lat, lng } = location;
  return L.marker(
    { lat, lng },
    {
      icon: createPinMarcer(iconType),
      draggable: isDraggable,
    },
  );
};

const removeMarkers = (map) => {
  map.eachLayer((layer) => {
    const { options } = layer;
    const { icon } = options;
    if (icon && icon.options.iconUrl === DEFAYLT_PIN_PATH) {
      layer.remove();
    }
  });
};

const renderMarkers = (map, offers) => {
  removeMarkers(map);
  offers.forEach((offer) => {
    const cardElement = getCardList(offer);
    createMarker(offer.location, ICON_TYPE.DEFAULT)
      .addTo(map)
      .bindPopup(cardElement);
  });
};

const displayMap = (mapElement, coordinates, onLoadMap, onPinMoveEnd) => {
  const map = L.map(mapElement)
    .on('load', onLoadMap)
    .setView(coordinates, ZOOM);

  L.tileLayer(TILE_LAYER_LINK, { attribution: TILE_LAYER_ATTRIBUTION })
    .addTo(map);

  const mainMarkerGroup = L
    .layerGroup()
    .addTo(map);

  const mainPinMarker = createMarker(coordinates, ICON_TYPE.MAIN, true);
  mainPinMarker.addTo(mainMarkerGroup);
  mainPinMarker.on('moveend', onPinMoveEnd);

  return {
    map,
    mainPinMarker,
  };
};

export { renderMarkers, displayMap };
