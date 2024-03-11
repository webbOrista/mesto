// Функции валидации форм

//функции запросов к серверу возвращают Promise, в них нет работы с DOM и изменения отображения страницы.
//валидация активируется только один раз, а не при каждом открытии модального окна.

// Функция отображения сообщения о некорретном вводе

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // найти в какой конкретно форме какой инпут не валиден
  inputElement.classList.add("form__input_type_error"); // сделать подчеркивание инпута красного цвета
  errorElement.textContent = errorMessage; // присвоить текст сообщения под строкой ввода
  errorElement.classList.add("form__input-error_active"); // отобразить сообщение под строкой ввода
}

// Функция скрытия сообщения о некорретном вводе

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

// Функция проверки валидности инпута (кастомное и дефолтное сообщение)

function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // в js имя атрибута пишется в camelCase
    // в HTML в kebab-case
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Функция, проверяющая есть ли внутри формы хотя бы один невалидный инпут

function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
}

// Функция включающая неактивное состояние кнопки формы, если хотя бы один инпут невалиден

function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add('form__submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute("disabled", true);
    buttonElement.classList.remove('form__submit_inactive');
  }
}

// Навешивание обработчиков на все инпуты в форме

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Активация валидации на всех формах

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'form__submit_inactive',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__input-error_active'


// Функция очистки формы от сообщений об ошибках

export function clearValidation(formElement, validationConfig){}

// export function clearValidation(formElement, validationConfig) {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validationConfig.submitButtonSelector
//   );

//   inputList.forEach((inputElement) => {
//     hideInputError({
//       formElement,
//       inputElement,
//       inputErrorClass: validationConfig.inputErrorClass,
//       errorClass: validationConfig.errorClass
//     });
//   });
//   toggleButtonState({
//     inputList,
//     buttonElement,
//     inactiveButtonClass: validationConfig.inactiveButtonClass,
//   });
// }


