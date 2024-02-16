//Объявление переменных, содержащих ссылки на картинки карточек, метод будет работать и без Webpack

const arkhyz = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  import.meta.url
);
const chelyabinsk = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  import.meta.url
);
const ivanovo = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  import.meta.url
);
const kamchatka = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  import.meta.url
);
const kholmogory = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  import.meta.url
);
const baikal = new URL(
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  import.meta.url
);

// Массив начальных карточек

export const initialCards = [
  { name: "Архыз", link: arkhyz },
  { name: "Челябинская область", link: chelyabinsk },
  { name: "Иваново", link: ivanovo },
  { name: "Камчатка", link: kamchatka },
  { name: "Холмогорский район", link: kholmogory },
  { name: "Байкал", link: baikal },
];
