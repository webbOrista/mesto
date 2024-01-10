// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


//Создаем объект из элемента HTML

const cardList = document.querySelector('.places__list');

//Задаем функцию создания карточки, навешиваем обработчик события

function createCard(item){
    const cardTemplate = document.querySelector('#card-template').content;
    const newCardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    newCardElement.querySelector('.card__image').src = item.link;
    newCardElement.querySelector('.card__image').alt = item.name;
    newCardElement.querySelector('.card__title').textContent = item.name;

    const deleteButton = newCardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click',() => deleteCard(newCardElement));

    return newCardElement;
}


//Создаем функцию добавления карточек на страницу

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardList.append(card);
})


//Создаем функцию удаления карточек со страницы

function deleteCard(item){
    item.remove();
}








 
