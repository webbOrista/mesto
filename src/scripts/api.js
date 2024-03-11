// В файле описаны функции для взаимодействия с сервером;

//базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;

const serverUrl = 'https://nomoreparties.co/v1/cohort-42';
const authorizationKey = 'c56e30dc-2883-4270-a59e-b2f7bae969c6';


const config = {
baseUrl: serverUrl,
headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
}
}

export const getInitialCards = () => {
return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
    .then(res => {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
    });
}

