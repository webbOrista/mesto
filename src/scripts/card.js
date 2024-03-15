//В файле описана логика работы с карточками

import {
  deleteCardRequest,
  addLikeToCardRequest,
  removeLikeFromCardRequest,
} from "../scripts/api.js";

//Функция создания карточки

export function createCard(
  cardData,
  deleteCard,
  zoomUpCardImage,
  toggleLike,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCardElement.querySelector(".card__image");
  const cardTitle = newCardElement.querySelector(".card__title");
  const deleteButton = newCardElement.querySelector(".card__delete-button");
  const cardLikeButton = newCardElement.querySelector(".card__like-button");
  const cardLikeAmountElement = newCardElement.querySelector(".card__like-amount");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardLikeAmountElement.textContent = cardData.likes.length.toString();

  //Обработчик кнопки удаления, удалять можно только свои карточки

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardData._id, newCardElement)
    );
  } else deleteButton.remove();

  //Обработчик кнопки лайка

  cardLikeButton.addEventListener("click", () =>
    toggleLike(cardData._id, cardLikeButton, cardLikeAmountElement)
  );

  //Обработчик вывода полноразмерной картинки по клику на изображение карточки
  cardImage.addEventListener("click", () =>
    zoomUpCardImage(cardImage, cardTitle)
  );

  return newCardElement;
}

//Функция удаления карточки со страницы

export function deleteCard(cardId, card) {
  deleteCardRequest(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    });
}

//Функция добавления/снятия лайка c карточки

export function toggleLike(cardId, button, likeAmount) {
  if (button.classList.contains("card__like-button_is-active")) {
    removeLikeFromCardRequest(cardId)
      .then((res) => {
        const amount = res.likes.length.toString();
        likeAmount.textContent = amount;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка:", err);
      });
  } else {
    addLikeToCardRequest(cardId)
      .then((res) => {
        const amount = res.likes.length.toString();
        likeAmount.textContent = amount;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка:", err);
      });
  }
}
