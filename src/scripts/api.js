// В файле описаны функции для взаимодействия с сервером;


//функции запросов к серверу возвращают Promise, в них нет работы с DOM и изменения отображения страницы.


const serverUrl = 'https://nomoreparties.co/v1/wff-cohort-9';
const authorizationKey = '52e38bc9-9b95-4e67-8615-786acb426380';

export const config = {
baseUrl: serverUrl,
headers: {
    authorization: authorizationKey,
    'Content-Type': 'application/json'
}
}

// Функция проверки корректности ответа сервера

export function resolveCheck(res) {
    if (res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}











// fetch('https://nomoreparties.co/v1/cohort-42/users/me')

// .then((res) => {
// return res.json();
// })
// .then((data) => {
//     console.log(data.user.name); //data — это объект
//     console.log(data.user.about);
//     console.log(data.user.avatar);
// })
// .catch((err) => {
// console.log('Ошибка. Запрос не выполнен: ', err);
// }); 






// Запрос на получение массива стартовых карточек 

// export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//         headers: config.headers
//     })
//         .then(res => {
//         if (res.ok) {
//             return res.json();
//         }
    
//         // если ошибка, отклоняем промис
//         return Promise.reject(`Ошибка: ${res.status}`);
//         });
//     }