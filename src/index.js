//импорт главного файла стилей
import "./pages/index.css";

import { createCard, deleteCard, toggleLike } from "./scripts/card.js";
import { openModal, closeModal, closePopupByOverlay } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialUserData,
  getInitialCards,
  updateProfileDataRequest,
  createNewCardRequest,
  updateProfileAvatarRequest,
} from "./scripts/api.js";

const cardsContainer = document.querySelector(".places__list");
const popup = document.querySelector(".popup");
const avatar = document.querySelector(".profile__image");
let userId;

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
popupEditProfile.addEventListener("mousedown", (evt) => {
  closePopupByOverlay(evt);
});

// выбираем элементы формы ввода данных попапа редактирования профиля
const popupEditProfileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// обработчик отправки данных из формы попапа редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const occupation = jobInput.value;
  evt.submitter.textContent = "Сохранение...";
  updateProfileDataRequest(name, occupation)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popup);
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
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
popupNewCard.addEventListener("mousedown", (evt) => {
  closePopupByOverlay(evt);
});

//выбираем элементы формы ввода данных попапа добавления новой карточки
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardPictureUrl = document.querySelector('input[name="cardLink"]');
const popupNewCardForm = document.forms["new-place"];

// Функция добавления новой карточки по нажатию на кнопку "+"
function addNewCard(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputCardPictureUrl.value;
  evt.submitter.textContent = "Сохранение...";
  createNewCardRequest(name, link, userId)
    .then((cardData) => {
      cardsContainer.prepend(
        createCard(cardData, deleteCard, zoomUpCardImage, toggleLike, userId)
      );
      popupNewCardForm.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
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
popupFullSizeImage.addEventListener("mousedown", (evt) => {
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

// ПОПАП ОБНОВЛЕНИЯ АВАТАРА

const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const popupUpdateAvatarCloseButton =
  popupUpdateAvatar.querySelector(".popup__close");
const popupUpdateAvatarForm = document.forms["update-avatar"];
const linkInput = document.querySelector('input[name="avatarLink"]');

// Обработчик открытия попапа обновления аватара профиля
avatar.addEventListener("click", function () {
  popupUpdateAvatarForm.reset();
  clearValidation(popupUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

// обработчик закрытия попапа обновления аватара профиля по клику на кнопку
popupUpdateAvatarCloseButton.addEventListener("click", function () {
  closeModal(popupUpdateAvatar);
});

// Обработчик закрытия попапа обновления аватара по клику на оверлэй
popupUpdateAvatar.addEventListener("mousedown", (evt) => {
  closePopupByOverlay(evt);
});

// Функция обновления аватара профиля
function updateProfileAvatar(evt) {
  evt.preventDefault();
  const avatarLink = linkInput.value;
  evt.submitter.textContent = "Сохранение...";
  updateProfileAvatarRequest(avatarLink)
    .then(() => {
      avatar.style.backgroundImage = `url(${avatarLink})`;
      closeModal(popupUpdateAvatar);
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

// Обработчик обновления аватара профиля
popupUpdateAvatar.addEventListener("submit", updateProfileAvatar);

// ВАЛИДАЦИЯ ФОРМ

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form_submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);

// РАБОТА С API

// Получение данных профиля и данных для отрисовки начальных карточек
Promise.all([getInitialUserData(), getInitialCards()])
  .then(([data, cards]) => {
    avatar.style.backgroundImage = `url(${data.avatar})`;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    userId = data._id;
    localStorage.setItem('userId', userId);
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(card, deleteCard, zoomUpCardImage, toggleLike, userId)
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка:", err);
  });
