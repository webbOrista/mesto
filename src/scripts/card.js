//В файле описана логика работы с карточками

import { cardImageZoomUp } from "../index.js";

//Функция создания карточки

export function createCard(item, deleteCard, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCardElement.querySelector(".card__image");
  const cardTitle = newCardElement.querySelector(".card__title");
  const deleteButton = newCardElement.querySelector(".card__delete-button");
  const cardLikeButton = newCardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  //Обработчик кнопки удаления

  deleteButton.addEventListener("click", () => deleteCard(newCardElement));

  //Функция добавления лайка карточке

  function likeCard() {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  //Обработчик кнопки лайка

  cardLikeButton.addEventListener("click", () => likeCard());

  //Обработчик вывода полноразмерной картинки по клику на изображение карточки
  cardImage.addEventListener("click", () => {
    cardImageZoomUp(newCardElement);
  });

  return newCardElement;
}

//Функция удаления карточки со страницы

export function deleteCard(item) {
  item.remove();
}
