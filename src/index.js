//В файле index.js должны остаться:
//объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
//обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий 
//попап при клике по изображению карточки);
//вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные
//здесь переменные и обработчики.
//вызов функции создания карточки должен находиться в файле index.js, но само объявление функции — в card.js.

//Определение глобальных переменных



const cardsContainer = document.querySelector('.places__list');



//импорт главного файла стилей 
import './pages/index.css';

//импорт функций 
import {createCard, deleteCard, cardImageZoomUp} from './scripts/cards.js';

//импорт переменных
import {initialCards} from './scripts/cards.js';



//добавляем начальные карточки на страницу, вызывая функцию createCard

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardsContainer.append(card);
})










// РАБОТАЕМ С ПОПАПАМИ И ФОРМАМИ



//Работаем с попапом редактирования профиля

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');


// Функция открытия попапа
export const openModal = function(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc)
} 

//Функция закрытия попапа
const closeModal = function(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

// слушатель кнопки открытия попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
});


// слушатель кнопки закрытия попапа Редактирования профиля
popupEditProfileCloseButton.addEventListener('click', function() {
    closeModal(popupEditProfile);
    
});



//ЗАКРЫТИЕ ПОПАПОВ


// Функция закрытия попапа по клику на оверлэй



const closePopupByOverlay = function (evt){
    const openedPopup = document.querySelector('.popup_is-opened')

    if(evt.target.classList.contains('popup')){
    closeModal(openedPopup)
}};


// Обработчик события закрытия попапа по клику на оверлэй

popupEditProfile.addEventListener('click', (evt) => {
    closePopupByOverlay (evt);
});









// Функция закрытия попапа при нажатии на клавишу ESC

const closePopupByEsc = function(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape' && !evt.target.classList.contains('popup_is-opened')){
        closeModal(openedPopup);  
    }
};






// обработчик события submit

// Находим форму и ее поля в DOM
const formElement = document.querySelector('.popup__form')
export const nameInput = document.querySelector('.popup__input_type_name')
export const jobInput = document.querySelector('.popup__input_type_description')

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popup);
}

// Обработчик события нажатия кнопки submit на форме редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);






// Попап добавления новых карточек

const newCardAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');

// слушатель кнопки закрытия попапа добавления новых карточек
popupNewCardCloseButton.addEventListener('click', function() {
    closeModal(popupNewCard);
    
});

// Обработчик события открытия попапа добавления новой карточки
newCardAddButton.addEventListener('click', function() {
    openModal(popupNewCard);
});

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardPictureUrl = document.querySelector('.popup__input_type_url');
const popupNewCardForm = document.forms['new-place'];

// Функция добавления новой карточки по нажатию на кнопку "+"
function addNewCard(evt) {
    evt.preventDefault();
    const cardData = {};
    cardData.name = inputCardName.value;
    cardData.link = inputCardPictureUrl.value;
    const newCard = createCard(cardData, deleteCard);
    cardsContainer.prepend(newCard);
    popupNewCardForm.reset();
    closeModal(popupNewCard);
    
}

// Обработчик события добавления новой карточки
popupNewCard.addEventListener('submit', addNewCard);

// Обработчик события закрытия попапа добавления новой карточки по клику на оверлей
popupNewCard.addEventListener('click', (evt) => {
    closePopupByOverlay (evt);
});


//Попап вывода полноразмерной картинки

export const popupFullSizeImage = document.querySelector('.popup_type_image')
const popupFullSizeImageCloseButton = popupFullSizeImage.querySelector('.popup__close');
popupFullSizeImageCloseButton.addEventListener('click', function() {
    closeModal(popupFullSizeImage);
    
});

// Обработчик события закрытия попапа вывода полноразмерной картинки по клику на оверлэй
popupFullSizeImage.addEventListener('click', (evt) => {
    closePopupByOverlay (evt);
});


