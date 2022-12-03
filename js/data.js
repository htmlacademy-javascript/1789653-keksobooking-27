import { getRandomNumber, getRandomNumberFloat, getRandomArrayElement } from './util.js';

const LOCATIONS = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

const PRICE = {
  MIN: 0,
  MAX: 100000,
};

const TITLES = [
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

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthorData = (id) => ({
  avatar: `img/avatars/user${id.toString().padStart(2, '0')}.png`,
});

const createOfferData = (id) => {
  const location = {
    lat: getRandomNumberFloat(LOCATIONS.MIN_LAT, LOCATIONS.MAX_LAT, 5),
    lng: getRandomNumberFloat(LOCATIONS.MAX_LNG, LOCATIONS.MAX_LNG, 5),
  };

  const times = {
    time: getRandomArrayElement(TIMES),
  };

  return {
    author: {
      avatar: createAuthorData(id),
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(PRICE.MIN, PRICE.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 3),
      checkin: times,
      checkout: times,
      features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: Array.from({ length: getRandomNumber(0, 3) }, () =>
        getRandomArrayElement(PHOTOS)
      )
    },

    location: location,
  };
};

const countOffer = (count) => {
  const offers = [];

  for (let i = 1; i <= count; i++) {
    offers.push(createOfferData(i));
  }
  return offers;
};

export { countOffer };
