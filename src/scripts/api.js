// В файле описаны функции для взаимодействия с сервером;

//функции запросов к серверу возвращают Promise, в них нет работы с DOM и изменения отображения страницы.

const serverUrl = "https://nomoreparties.co/v1/wff-cohort-9";
const authorizationKey = "52e38bc9-9b95-4e67-8615-786acb426380";

export const config = {
  baseUrl: serverUrl,
  headers: {
    authorization: authorizationKey,
    "Content-Type": "application/json",
  },
};

// Запрос на получение данных пользователя от сервера

export const getInitialUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на получение начальных карточек с сервера

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
