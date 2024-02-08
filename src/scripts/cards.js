
// При таком способе картинки не появятся в итоговой сборке, тк webpack поменяет пути до них.
// const initialCards = [
//     {
//       name: "Архыз",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//     },
//     {
//       name: "Челябинская область",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//     },
//     {
//       name: "Иваново",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//     },
//     {
//       name: "Камчатка",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//     },
//     {
//       name: "Холмогорский район",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//     },
//     {
//       name: "Байкал",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//     }
// ];


//Этот способ добавления будет работать и без Webpack
const karachaevsk = new URL('../images/card_1.jpg', import.meta.url);
const elbrus = new URL('../images/card_2.jpg', import.meta.url);
const dombay = new URL('../images/card_3.jpg', import.meta.url)

export const initialCards = [
  // меняем исходные пути на переменные
  { name: 'Карачаевск', link: karachaevsk },
  { name: 'Гора Эльбрус', link: elbrus },
  { name: 'Домбай', link: dombay }
]; 

//Это более короткий способ, но работать будет только при сборке проекта в Webpack
// import karachaevsk from '../images/card_1.jpg';
// import elbrus from '../images/card_2.jpg';
// import dombay from '../images/card_3.jpg';

// export const initialCards = [
//   // меняем исходные пути на переменные
//   { name: 'Карачаевск', link: karachaevsk },
//   { name: 'Гора Эльбрус', link: elbrus },
//   { name: 'Домбай', link: dombay },
// ];