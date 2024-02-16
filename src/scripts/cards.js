

//здесь должен остаться только массив с карточками
import { openModal, popupFullSizeImage } from "../index.js";


//Задаем функцию создания карточки, навешиваем обработчик события
export function createCard(item, deleteCard){

  const cardTemplate = document.querySelector('#card-template').content;
  const newCardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  newCardElement.querySelector('.card__image');
  const cardTitle = newCardElement.querySelector('.card__title');
  
  
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const deleteButton = newCardElement.querySelector('.card__delete-button');
  // Обработчик кнопки удаления
  deleteButton.addEventListener('click',() => deleteCard(newCardElement));

  // Обработчик кнопки лайка
  const cardLikeButton = newCardElement.querySelector('.card__like-button');
  const likeCard = function () {cardLikeButton.classList.toggle('card__like-button_is-active')};
  cardLikeButton.addEventListener('click', function() {likeCard()});

  //Обработчик вызова попапа полноразмерного изображения карточки по клику на изображение карточки
  cardImage.addEventListener('click', function() {
    cardImageZoomUp(newCardElement);
  });


  return newCardElement;
}





// попап полноразмерного изображения карточки


const fullSizeImage = document.querySelector('.popup__image')
const fullSizeImageCaption = document.querySelector('.popup__caption')

export const cardImageZoomUp = function(newCardElement){
  const imageUrl = newCardElement.querySelector('.card__image').src;
  const imageCaption = newCardElement.querySelector('.card__image').alt;
  fullSizeImage.src = imageUrl;
  fullSizeImage.alt = imageCaption;
  fullSizeImageCaption.textContent = imageCaption;
  openModal(popupFullSizeImage);
};





//Создаем функцию удаления карточек со страницы

export function deleteCard(item){
  item.remove();
}


//Объявление переменных, содержащих ссылки на картинки карточек, метод будет работать и без Webpack
const arkhyz = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelyabinsk = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovo = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatka = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const kholmogory = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikal = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

// Массив начальных карточек
export const initialCards = [
  { name: 'Архыз', link: arkhyz },
  { name: 'Челябинская область', link: chelyabinsk },
  { name: 'Иваново', link: ivanovo },
  { name: 'Камчатка', link: kamchatka },
  { name: 'Холмогорский район', link: kholmogory },
  { name: 'Байкал', link: baikal }
]; 







