const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarElement = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageElement = document.querySelector('#images');
const imagePreviev = document.querySelector('.ad-form__photo');
const picturePreview = document.createElement('img');

avatarElement.addEventListener('change', () => {
  const [file] = avatarElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageElement.addEventListener('change', () => {
  const [file] = imageElement.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
    picturePreview.style.width = '70px';
    picturePreview.style.height = '70px';
  }
  imagePreviev.append(picturePreview);
});

const resetPreview = () => {
  avatarElement.value = '';
  imageElement.value = '';
  avatarPreview.src = DEFAULT_AVATAR;
  imagePreviev.innerHTML = '';
};

export { resetPreview };
