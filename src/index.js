
import {initialCards} from './scripts/cards.js'

// добавьте импорт главного файла стилей 

import './pages/index.css'; // у тебя в проекте путь к этому файлу через src и pages

//Создаем объект из элемента HTML

const cardsContainer = document.querySelector('.places__list');

//Находим в разметке шаблон карточки, забираем его содержимое

const cardTemplate = document.querySelector('#card-template').content;

//Задаем функцию создания карточки, навешиваем обработчик события

function createCard(item, deleteCard){
    
    const newCardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    newCardElement.querySelector('.card__image').src = item.link;

    const cardName = item.name;
    
    newCardElement.querySelector('.card__image').alt = cardName;
    newCardElement.querySelector('.card__title').textContent = cardName;

    const deleteButton = newCardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click',() => deleteCard(newCardElement));

    return newCardElement;
}


//Создаем функцию добавления карточек на страницу

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardsContainer.append(card);
})


//Создаем функцию удаления карточек со страницы

function deleteCard(item){
    item.remove();
}








 
