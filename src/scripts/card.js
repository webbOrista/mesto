//В файле описана логика работы с карточками

//Функция создания карточки

export function createCard(item, deleteCard, zoomUpCardImage, likeCard) {
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

  //Обработчик кнопки лайка

  cardLikeButton.addEventListener("click", () => likeCard(cardLikeButton));

  //Обработчик вывода полноразмерной картинки по клику на изображение карточки
  cardImage.addEventListener("click", () =>
    zoomUpCardImage(cardImage, cardTitle)
  );

  return newCardElement;
}

//Функция удаления карточки со страницы

export function deleteCard(item) {
  item.remove();
}

//Функция добавления лайка карточке

export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}
