// GitHub Pages - статический хостинг, поэтому ключи здесь, а не в .env((
const serverUrl = "https://nomoreparties.co/v1/wff-cohort-9";
const authorizationKey = "52e38bc9-9b95-4e67-8615-786acb426380";
const userId = localStorage.getItem('userId');

export const config = {
  baseUrl: serverUrl,
  headers: {
    authorization: authorizationKey,
    "Content-Type": "application/json",
  },
};

// Функция проверки статуса ответа сервера

export const checkResolve = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос на получение данных пользователя

export const getInitialUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => checkResolve(res));
};

// Запрос на получение начальных карточек

export const getInitialCards = () => {
  return (
    fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
      .then((res) => checkResolve(res))
      // Добавил фильтрацию по id, чтобы отображались только мои карточки
      .then((cards) => {
        return cards.filter((card) => card.owner._id === userId);
      })
      
  );
};

// Запрос на обновление данных пользователя при редактировании профиля

export const updateProfileDataRequest = (name, occupation) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: occupation,
    }),
  }).then((res) => checkResolve(res));
};

// Запрос с данными для добавления новой карточки

export const createNewCardRequest = (name, link, userId) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      _id: userId,
      name: name,
      link: link,
    }),
  }).then((res) => checkResolve(res));
};

// Запрос на обновление аватара профиля

export const updateProfileAvatarRequest = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkResolve(res));
};

// Запрос на удаление карточки

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResolve(res));
};

// Запрос на добавление лайка карточке

export const addLikeToCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResolve(res));
};

// Запрос на снятие лайка с карточки

export const removeLikeFromCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResolve(res));
};
