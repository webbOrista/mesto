// В файле описана логика работы с модальными окнами

// Функция открытия попапа
export const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
};

//Функция закрытия попапа
export const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

// Функция закрытия попапа по клику на оверлэй
export const closePopupByOverlay = function (evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup")) {
    closeModal(openedPopup);
  }
};

// Функция закрытия попапа при нажатии на клавишу ESC
const closePopupByEsc = function (evt) {
  if (
    evt.key === "Escape" &&
    !evt.target.classList.contains("popup_is-opened")
  ) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};
