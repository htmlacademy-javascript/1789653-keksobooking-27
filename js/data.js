import { getRandomNumber, getRandomNumberFloat, getRandomArrayElement } from './util.js';

const NUMBER_OFFERS = 10;

const Location = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

const Price = {
  MIN: 0,
  MAX: 100000,
};

const titles = [
  'Стандартная квартира в центре города',
  'Прекрасный вид из окна на городской парк',
  'Рядом с домом большое количество кафе',
  'Маленькая и очень уютная квартирка',
  'Квартира в многоквартирном доме',
  'Маленькая квартира рядом с парком',
  'Шикарный вид из окна на море',
  'Квартира с видом на горы',
  'Комната на чердаке',
  'Уютное гнёздышко',
  'Комната в многокомнатной квартире',
  'Мини-отель',
  'Президент-отель',
  'Хостел',
  'Расположение в деловом районе города',
  'Небольшая бюджетная квартира для студентов',
];

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const times = ['12:00', '13:00', '14:00'];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const description = [
  'На первом этаже дома располагается хорошая пекарня с очень вкусными крендельками',
  'Рядом с домом находится ЖД депо каждое утро примерно в четыре утра из него выезжает состав с тремя вагонами в одном из них постоянно перекатываются трубы с характерным звуком',
  'Удачное расположение дома в центре города, до метро не более пяти минут пешком',
  'Небольшая комната с небольшим окном и раздвижной кроватью',
  'Великолепная квартира студия в центре города, подходит как туристам, так и деловым человекам.',
  'Очень огромная квартира со всеми удобствами на окраине города',
  'Через дорогу располагается хороший ресторан суши, очень вкусно готовят. Для любителей данной кухни советую туда обязательно зайти',
  'Чистая и очень уютная квартира. Есть где разместиться большой компании',
  'Квартира на первом этаже. Приветливые соседи. Для тех кто ценит тишину и спокойствие',
  'Хорошее расположение в историческом центре города. Рядом находится огромное количество музеев, парков и кафе.',
  'Небольшая, светлая и очень уютная квартира, панорамные окна с видом на море. Во дворе дома есть детская площадка.',
  'Квартира со всеми удобствами холодильник, интернет, парковка.',
  'Огромный особняк за городом. Возможность размещения больших компаний, делегаций и т.д. Обслуживание на высшем уровне. Все плюшки и прелести жизни есть. Интернет, огромная парковка, бассейн и фитнес зал.',
  'Маленькая квартира на последнем этаже. Интернета нет. Холодильника тоже нет. Туалет на первом этаже. Душ по расписанию. И да лифт тоже не работает. Строго для любителей хардкора.',
  'Маленький бокс чисто для переночевать и привести себя в порядок',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomLatitude = () =>
  getRandomNumberFloat(Location.MIN_LAT, Location.MAX_LAT, 5);

const getRandomLongitude = () =>
  getRandomNumberFloat(Location.MAX_LNG, Location.MAX_LNG, 5);

const createAuthorData = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const createOfferData = () => ({
  title: getRandomArrayElement(titles),
  address: `${getRandomLatitude()}, ${getRandomLongitude()}`,
  price: getRandomNumber(Price.MIN, Price.MAX),
  type: getRandomArrayElement(types),
  rooms: getRandomNumber(1, 3),
  guests: getRandomNumber(1, 3),
  checkin: getRandomArrayElement(times),
  checkout: getRandomArrayElement(times),
  features: features.slice(0, getRandomNumber(0, features.length)),
  description: getRandomArrayElement(description),
  photos: Array.from({ length: getRandomNumber(0, 10) }, () =>
    getRandomArrayElement(photos)
  ),
});

const createLocationData = () => ({
  lat: getRandomLatitude(),
  lng: getRandomLongitude(),
});

const createOffer = (index) => ({
  author: createAuthorData(index),
  offer: createOfferData(),
  location: createLocationData(),
});

const getOffers = () =>
  Array.from({ length: NUMBER_OFFERS }, (_, offerIndex) => createOffer(offerIndex + 1));

export { getOffers };
