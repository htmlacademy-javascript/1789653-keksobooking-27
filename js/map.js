import { getCardList } from './card.js';
import { setActiveAdForm, getAddress } from './form.js';

const ZOOM = 10;

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createMarker = (offers, markerGrop) => {
  offers.forEach((offer) => {
    const cardElement = getCardList(offer);
    const marker = L.marker(
      { lat: offer.location.lat, lng: offer.location.lng },
      { icon: pinIcon },
    );
    marker
      .addTo(markerGrop)
      .bindPopup(cardElement);
  });
};

const displayMap = (mapElement, addressElement, coordinates) => {
  const map = L.map(mapElement)
    .on('load', () => {
      getAddress(addressElement, coordinates);
      setActiveAdForm(true);
    })
    .setView(coordinates, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinMarker = L.marker(
    coordinates, { draggable: true, icon: mainPinIcon, }
  );
  const markerGroup = L.layerGroup().addTo(map);
  mainPinMarker.addTo(markerGroup);

  mainPinMarker.on('moveend', ({target}) => {
    getAddress(addressElement, target.getLatLng());
  });
  return map;
};

export { displayMap, createMarker };
