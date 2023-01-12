const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarElement = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageElement = document.querySelector('#images');
const imagePreviev = document.querySelector('.ad-form__photo');
const picturePreview = document.createElement('img');

const pushAvatarElement = () => {
  const [file] = avatarElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }

  avatarElement.removeEventListener('change', pushAvatarElement);
};

const pushImageElement = () => {
  const [file] = imageElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
    picturePreview.style.width = '70px';
    picturePreview.style.height = '70px';
  }

  imagePreviev.append(picturePreview);
  imageElement.removeEventListener('change', pushImageElement);
};

const avatarChangeElement = () =>
  avatarElement.addEventListener('change', pushAvatarElement);

const imageChangeElement = () =>
  imageElement.addEventListener('change', pushImageElement);

const resetPreview = () => {
  avatarElement.value = '';
  imageElement.value = '';
  avatarPreview.src = DEFAULT_AVATAR;
  imagePreviev.innerHTML = '';
};

export { resetPreview, avatarChangeElement, imageChangeElement };
