//импорт главного файла стилей
import "./pages/index.css";

//импорт функций
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal, closePopupByOverlay } from "./scripts/modal.js";

//импорт массива начальных карточек
// import { initialCards } from "./scripts/cards.js";

//определение переменных
const cardsContainer = document.querySelector(".places__list");
const popup = document.querySelector(".popup");

//добавляем начальные карточки на страницу
// initialCards.forEach((item) => {
//   const card = createCard(item, deleteCard, zoomUpCardImage, likeCard);
//   cardsContainer.append(card);
// });

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

//выбираем элементы для работы с попапом редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfileCloseButton =
  popupEditProfile.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
});

// обработчик закрытия попапа редактирования профиля по клику на кнопку
popupEditProfileCloseButton.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

// Обработчик события закрытия попапа редактирования профиля по клику на оверлэй
popupEditProfile.addEventListener("click", (evt) => {
  closePopupByOverlay(evt);
});

// выбираем элементы формы ввода данных попапа редактирования профиля
const popupEditProfileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// обработчик отправки данных из формы попапа редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popup);
}

// обработчик нажатия кнопки submit на форме редактирования профиля
popupEditProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК

// выбираем элементы для работы с попапом добавления новых карточек
const newCardAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");

// Обработчик открытия попапа добавления новой карточки
newCardAddButton.addEventListener("click", function () {
  clearValidation(popupNewCard, validationConfig);
  popupNewCardForm.reset();
  openModal(popupNewCard);
});

// обработчик кнопки закрытия попапа добавления новой карточки по клику на кнопку
popupNewCardCloseButton.addEventListener("click", function () {
  closeModal(popupNewCard);
});

// Обработчик события закрытия попапа добавления новой карточки по клику на оверлей
popupNewCard.addEventListener("click", (evt) => {
  closePopupByOverlay(evt);
});

//выбираем элементы формы ввода данных попапа добавления новой карточки
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardPictureUrl = document.querySelector(".popup__input_type_url");
const popupNewCardForm = document.forms["new-place"];

// Функция добавления новой карточки по нажатию на кнопку "+"
function addNewCard(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = inputCardName.value;
  cardData.link = inputCardPictureUrl.value;
  const newCard = createCard(cardData, deleteCard, zoomUpCardImage, likeCard);
  cardsContainer.prepend(newCard);
  popupNewCardForm.reset();
  closeModal(popupNewCard);
}

// Обработчик добавления новой карточки
popupNewCard.addEventListener("submit", addNewCard);

// ПОПАП ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ИЗОБРАЖЕНИЯ КАРТОЧКИ

const popupFullSizeImage = document.querySelector(".popup_type_image");
const popupFullSizeImageCloseButton =
  popupFullSizeImage.querySelector(".popup__close");

// Обработчик события закрытия попапа вывода полноразмерной картинки по клику на кнопку
popupFullSizeImageCloseButton.addEventListener("click", function () {
  closeModal(popupFullSizeImage);
});

// Обработчик события закрытия попапа вывода полноразмерной картинки по клику на оверлэй
popupFullSizeImage.addEventListener("click", (evt) => {
  closePopupByOverlay(evt);
});

// функция вызова полноразмерного изображения карточки
const fullSizeImage = document.querySelector(".popup__image");
const fullSizeImageCaption = document.querySelector(".popup__caption");

export function zoomUpCardImage(cardImage, cardTitle) {
  fullSizeImage.src = cardImage.src;
  fullSizeImage.alt = cardTitle.alt;

  fullSizeImageCaption.textContent = cardTitle.textContent;
  openModal(popupFullSizeImage);
}


// ВАЛИДАЦИЯ ФОРМ и новая логика получения файлов

import { enableValidation, clearValidation, validationConfig } from "./scripts/validation.js";

enableValidation(validationConfig);

// ПОДКЛЮЧЕНИЕ САЙТА К СЕРВЕРУ, РАБОТА С API

import {config, resolveCheck } from './scripts/api.js'

const avatar = document.querySelector(".profile__image")
// const userId = "";


// Запрос на получение данных пользователя от сервера

function getInitialUserData(){
  return fetch(`${config.baseUrl}/users/me`,{
      method: "GET",
      headers: config.headers,})
      .then(result => resolveCheck(result))
      .then((data)=>{
          avatar.style.backgroundImage = `url(${data.avatar})`;
          profileTitle.textContent = data.name;
          profileDescription.textContent = data.about;
          // userId = data._id;
      })

}

getInitialUserData();


// Запрос на получение начальных карточек с сервера

function getInitialCards(){
  return fetch(`${config.baseUrl}/cards`,{
    method: "GET",
    headers: config.headers,})
    .then(result => resolveCheck(result))
    .then((cards)=> {
      cards.forEach((card) => {
        cardsContainer.append(createCard(card, deleteCard, zoomUpCardImage, likeCard))
      })

    })
}

getInitialCards()


// в package.json описан скрипты predeploy и deploy выполняющие сборку и деплой приложения;








